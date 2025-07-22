const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/users');

// JWT secret - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }
    
    // Validate user credentials
    const user = await users.validatePassword(email, password);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Get user's church assignments
    const churchAssignments = await users.getChurchAssignments(user.id);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        ...user,
        churchAssignments
      }
    });
    
  } catch (err) {
    next(err);
  }
});

// POST /auth/register (for creating new admin accounts)
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name, role = 'church_admin' } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ 
        error: 'Email, password, and name are required' 
      });
    }
    
    // Check if user already exists
    const existingUser = await users.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email already exists' 
      });
    }
    
    // Validate role
    const validRoles = ['superuser', 'church_admin', 'user'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        error: 'Invalid role specified' 
      });
    }
    
    // Create new user
    const newUser = await users.create({
      email,
      password,
      name,
      role
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: newUser
    });
    
  } catch (err) {
    next(err);
  }
});

// POST /auth/verify-token
router.post('/verify-token', async (req, res, next) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ 
        error: 'Token is required' 
      });
    }
    
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get fresh user data
    const user = await users.getById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'User not found' 
      });
    }
    
    // Get user's church assignments
    const churchAssignments = await users.getChurchAssignments(user.id);
    
    res.json({
      valid: true,
      user: {
        ...user,
        churchAssignments
      }
    });
    
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Invalid or expired token' 
      });
    }
    next(err);
  }
});

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required' 
    });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Invalid or expired token' 
      });
    }
    
    req.user = decoded;
    next();
  });
};

// GET /auth/profile (protected route example)
router.get('/profile', authenticateToken, async (req, res, next) => {
  try {
    const user = await users.getById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }
    
    // Get user's church assignments
    const churchAssignments = await users.getChurchAssignments(user.id);
    
    res.json({
      ...user,
      churchAssignments
    });
    
  } catch (err) {
    next(err);
  }
});

// POST /auth/change-password - Change user password
router.post('/change-password', authenticateToken, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    
    console.log('Password change request for user:', userId);
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Current password and new password are required' 
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: 'New password must be at least 6 characters long' 
      });
    }
    
    // Get user from database with password hash
    const user = await users.getByIdWithPassword(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('User found, verifying current password');
    
    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isCurrentPasswordValid) {
      console.log('Current password is incorrect for user:', userId);
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    console.log('Current password verified, updating to new password');
    
    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    
    // Update password in database
    await users.updatePassword(userId, newPasswordHash);
    
    console.log('Password updated successfully for user:', userId);
    
    res.json({ message: 'Password changed successfully' });
    
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ 
      error: 'Internal server error while changing password. Please try again.' 
    });
  }
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;

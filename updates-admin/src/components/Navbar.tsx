import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// Navbar component to be shared across all pages
export function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleHomeClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <AppBar position="fixed" color="secondary" elevation={1} sx={{ borderBottom: 2, borderColor: 'secondary.main', top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography 
          variant="h5" 
          sx={{ flexGrow: 1, fontWeight: 700, color: 'text.primary', letterSpacing: 2, cursor: 'pointer' }}
          onClick={handleHomeClick}
        >
          Updates
        </Typography>
        {isLoggedIn ? (
          <>
            <Typography variant="body1" sx={{ color: 'text.primary', mr: 2 }}>
              Welcome, {user?.name}
            </Typography>
            <Button color="inherit" onClick={logout} sx={{ color: 'error.main', fontWeight: 600 }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/enroll')} sx={{ color: 'secondary.main', mr: 2, fontWeight: 600 }}>
              Enroll
            </Button>
            <Button color="inherit" onClick={() => navigate('/login')} sx={{ color: 'error.main', fontWeight: 600 }}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

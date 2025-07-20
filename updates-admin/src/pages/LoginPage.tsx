import React, { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../auth/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const { login, loading, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !passphrase.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    const success = await login(email, passphrase);
    if (success) {
      navigate('/dashboard');
    }
    // Error handling is done by auth context, but we can also show local error
    // The authError from context will be displayed below
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="sm" sx={{ pt: 15, pb: 8 }}>
        <Card sx={{ p: 4 }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textAlign: 'center' }}>
              Admin Login
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 4, textAlign: 'center' }}>
              Enter your credentials to access your church's admin portal.
            </Typography>
            
            {(error || authError) && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error || authError}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Passphrase"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                margin="normal"
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                disabled={loading}
                sx={{ fontWeight: 600, py: 1.5 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

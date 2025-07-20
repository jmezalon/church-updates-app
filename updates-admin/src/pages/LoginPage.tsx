import React, { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../auth/AuthContext';

export function LoginPage() {
  const [name, setName] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(name, passphrase)) {
      navigate('/dashboard');
    } else {
      setError('Please enter both name and passphrase');
    }
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
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                sx={{ fontWeight: 600, py: 1.5 }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

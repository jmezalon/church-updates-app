import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../auth/AuthContext';

export function Dashboard() {
  const { user } = useAuth();
  
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Navbar />
      <Box sx={{ pt: 10, width: '100%' }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, color: 'secondary.main', mb: 2, textAlign: 'center' }}>
            Welcome to Your Dashboard, {user?.name}!
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.primary', mb: 6, textAlign: 'center' }}>
            Manage your church's events and announcements from here.
          </Typography>
          
          {/* Dashboard Content */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 6 }}>
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main', mb: 2 }}>
                  📅 Manage Events
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', mb: 3 }}>
                  Add, edit, and delete your church's upcoming events. Keep your community informed about services, meetings, and special occasions.
                </Typography>
                <Button variant="contained" color="secondary" sx={{ fontWeight: 600 }}>
                  Manage Events
                </Button>
              </CardContent>
            </Card>
            
            <Card sx={{ p: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main', mb: 2 }}>
                  📢 Announcements
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', mb: 3 }}>
                  Create and manage church announcements, reminders, and important updates for your congregation.
                </Typography>
                <Button variant="contained" sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 600, '&:hover': { bgcolor: '#d32f2f' } }}>
                  Manage Announcements
                </Button>
              </CardContent>
            </Card>
          </Box>
          
          {/* Quick Stats */}
          <Card sx={{ p: 4, bgcolor: '#f8f9fa' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 3, textAlign: 'center' }}>
                📊 Quick Overview
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 3, textAlign: 'center' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main' }}>5</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>Active Events</Typography>
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main' }}>12</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>Announcements</Typography>
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>248</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>Community Members</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

// React import not needed with JSX Transform
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../auth/AuthContext';
import { ChurchEnrollment } from '../components/ChurchEnrollment';
import { SuperuserDashboard } from '../components/SuperuserDashboard';

export function Dashboard() {
  const { user } = useAuth();
  
  // Route superusers to SuperuserDashboard
  if (user?.role === 'superuser') {
    return <SuperuserDashboard />;
  }
  
  // Handle enrollment status for church admins
  if (user?.role === 'church_admin') {
    const enrollmentStatus = user?.enrollment_status || 'none';
    const hasChurchAssignments = user?.churchAssignments && user.churchAssignments.length > 0;
    
    // If user has submitted enrollment but not yet assigned, show pending message
    if (enrollmentStatus === 'pending' && !hasChurchAssignments) {
      return (
        <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
          <Navbar />
          <Box sx={{ pt: 10, width: '100%' }}>
            <Container maxWidth="md" sx={{ py: 8 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 4, textAlign: 'center' }}>
                🕐 Enrollment Pending
              </Typography>
              
              <Card sx={{ p: 4, textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main', mb: 3 }}>
                    ✅ Church Enrollment Submitted Successfully!
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.6 }}>
                    Thank you for submitting your church enrollment request. Our team is currently reviewing your application.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.6 }}>
                    You will receive an email notification once your church has been approved and you have been assigned as an admin.
                    After approval, you'll be able to access the full admin dashboard to manage your church's events and announcements.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    Please check your email for updates on your request status.
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          </Box>
        </Box>
      );
    }
    
    // If user has no church assignments and no pending enrollment, show enrollment form
    if (!hasChurchAssignments && enrollmentStatus === 'none') {
      return <ChurchEnrollment />;
    }
  }
  
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Navbar />
      <Box sx={{ pt: 10, width: '100%' }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, color: 'secondary.main', mb: 2, textAlign: 'center' }}>
            Welcome to Your Dashboard, {user?.name}!
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.primary', mb: 2, textAlign: 'center' }}>
            Managing: {user?.churchAssignments?.[0]?.church_name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, textAlign: 'center' }}>
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

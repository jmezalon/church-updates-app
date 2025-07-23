import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import homepageImage from '../assets/homepageview.png';
import eventpageImage from '../assets/eventpage.png';

export function Landing() {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Navbar />
      {/* Add top padding to account for fixed navbar */}
      <Box sx={{ pt: 10, width: '100%' }}>
        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 900, color: 'secondary.main', mb: 2 }}>
            Welcome to Updates
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.primary', mb: 4, maxWidth: '800px', mx: 'auto' }}>
            The all-in-one platform for church event updates, member engagement, and community connection.
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary', mb: 6, maxWidth: '600px', mx: 'auto', fontSize: '1.1rem' }}>
            <b>Our Mission:</b> Empower churches and their members to stay connected, informed, and inspired. With Updates, you can manage events, announcements, and more—all in one place.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="secondary" 
            sx={{ fontWeight: 700, px: 6, py: 2, fontSize: '1.1rem', mb: 8 }} 
            onClick={() => navigate('/enroll')}
          >
            Enroll Your Church
          </Button>
        </Container>

        {/* App Screenshots Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 6, textAlign: 'center' }}>
            Experience the App
          </Typography>
          
          {/* Home Screen Feature */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mb: 8, gap: 4 }}>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'secondary.main', mb: 2 }}>
                Stay Updated with Church Events
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
                Browse all upcoming events from your favorite churches in one beautiful, scrollable feed. 
                See event details, dates, locations, and church information at a glance.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                ✨ Beautiful event cards with church logos and event images
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Box 
                sx={{ 
                  width: 405, 
                  height: 615, 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  boxShadow: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={homepageImage} 
                  alt="Updates App Home Screen - Event Feed" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '16px'
                  }} 
                />
              </Box>
            </Box>
          </Box>

          {/* Event Detail Feature */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row-reverse' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main', mb: 2 }}>
                Detailed Event Information
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
                Tap any event to see complete details including date, time, location, contact information, 
                website links, and pricing. Everything you need to plan your attendance.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                📱 Easy navigation with bottom tab bar for seamless browsing
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Box 
                sx={{ 
                  width: 405, 
                  height: 615, 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  boxShadow: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={eventpageImage} 
                  alt="Updates App Event Detail Page" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '16px'
                  }} 
                />
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Call to Action Section */}
        <Box sx={{ bgcolor: 'secondary.main', py: 8, mt: 8, width: '100%' }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'black', mb: 3 }}>
              Ready to Connect Your Church?
            </Typography>
            <Typography variant="h6" sx={{ color: 'black', mb: 4, opacity: 0.8 }}>
              Join churches already using Updates to keep their communities informed and engaged.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: 'white', 
                color: 'black', 
                fontWeight: 700, 
                px: 6, 
                py: 2, 
                fontSize: '1.1rem',
                '&:hover': { bgcolor: '#f5f5f5' }
              }} 
              onClick={() => navigate('/enroll')}
            >
              Get Started Today
            </Button>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

// React import not needed with JSX Transform
import { Box, Container, Typography } from '@mui/material';
import { Navbar } from '../components/Navbar';

export function EnrollPage() {
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pt: 15, pb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 4, textAlign: 'center' }}>
          Enroll Your Church
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 6, textAlign: 'center' }}>
          Ready to get your church connected with Updates? Send us an enrollment request and we'll set up your admin account.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main', mb: 2 }}>
          What happens next:
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 4, lineHeight: 1.8 }}>
          1. Fill out the enrollment form below<br/>
          2. We'll review your request and create your admin account<br/>
          3. You'll receive login credentials via email<br/>
          4. Start managing your church's events and announcements!
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 4, textAlign: 'center', fontStyle: 'italic' }}>
          Enrollment form coming soon. For now, please contact us directly to get started.
        </Typography>
      </Container>
    </Box>
  );
}

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  TextField,
  Alert
} from '@mui/material';
import { Navbar } from './Navbar';

interface ChurchEnrollmentProps {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export function ChurchEnrollment({ user }: ChurchEnrollmentProps) {
  const [churchName, setChurchName] = useState('');
  const [pastorName, setPastorName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First create the church
      const churchResponse = await fetch('http://localhost:3000/churches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          name: churchName,
          senior_pastor: pastorName,
          address,
          city,
          state,
          zip,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          website,
          description
        })
      });

      if (!churchResponse.ok) {
        throw new Error('Failed to create church');
      }

      const newChurch = await churchResponse.json();

      // Send assignment request to superuser (in a real app, this would send an email)
      // For now, we'll create a simple notification system
      console.log('Church enrollment request submitted:', {
        userId: user.id,
        churchId: newChurch.id,
        churchName: newChurch.name,
        userEmail: user.email,
        userName: user.name
      });

      setSuccess(true);
      setLoading(false);

      // In a real implementation, you would send an email to the superuser
      // For demo purposes, we'll show a success message
      
    } catch (err) {
      console.error('Church enrollment error:', err);
      setError('Failed to submit church enrollment. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
        <Navbar />
        <Box sx={{ pt: 10, width: '100%' }}>
          <Container maxWidth="md" sx={{ py: 8 }}>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main', mb: 3 }}>
                  🎉 Enrollment Request Submitted!
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mb: 4 }}>
                  Thank you for enrolling your church with Updates!
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', mb: 4, lineHeight: 1.8 }}>
                  Your church enrollment request has been submitted successfully. Here's what happens next:
                </Typography>
                <Box sx={{ textAlign: 'left', mb: 4 }}>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                    ✅ <strong>Request Submitted:</strong> Your church "{churchName}" has been created in our system
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                    📧 <strong>Superuser Notification:</strong> Our admin team has been notified of your request
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                    ⏳ <strong>Review Process:</strong> We'll review your request and assign you as admin for your church
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                    📬 <strong>Email Notification:</strong> You'll receive an email confirmation once approved
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                    🚀 <strong>Start Managing:</strong> Once approved, you can manage events and announcements
                  </Typography>
                </Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    <strong>Demo Note:</strong> In this demo environment, you can ask the superuser 
                    (admin@updates.com) to manually assign you to your church using the admin tools.
                  </Typography>
                </Alert>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  Please check your email ({user.email}) for updates on your request status.
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Navbar />
      <Box sx={{ pt: 10, width: '100%' }}>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, textAlign: 'center' }}>
            Enroll Your Church
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.primary', mb: 6, textAlign: 'center' }}>
            Welcome {user.name}! Let's get your church set up in the Updates system.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Card sx={{ p: 4 }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main', mb: 4 }}>
                  Church Information
                </Typography>
                
                {/* Row 1: Church Name and Pastor Name */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Church Name"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Senior Pastor Name"
                    value={pastorName}
                    onChange={(e) => setPastorName(e.target.value)}
                    required
                  />
                </Box>
                
                {/* Row 2: Address */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Box>
                
                {/* Row 3: City, State, ZIP */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                  <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Box>
                
                {/* Row 4: Contact Email and Phone */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </Box>
                
                {/* Row 5: Website */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourchurch.com"
                  />
                </Box>
                
                {/* Row 6: Description */}
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Church Description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your church community..."
                  />
                </Box>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled={loading}
                  sx={{ fontWeight: 600, py: 2 }}
                >
                  {loading ? 'Submitting Request...' : 'Submit Church Enrollment'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

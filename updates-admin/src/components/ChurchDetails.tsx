import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  TextField,
  Alert,
  Avatar,
  IconButton
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Navbar } from './Navbar';

interface Church {
  id: number;
  name: string;
  senior_pastor: string;
  pastor?: string;
  assistant_pastor?: string;
  senior_pastor_avatar?: string;
  pastor_avatar?: string;
  assistant_pastor_avatar?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  logo_url?: string;
  banner_url?: string;
  description?: string;
}

interface ChurchDetailsProps {
  churchId: number;
  onBack: () => void;
}

export function ChurchDetails({ churchId, onBack }: ChurchDetailsProps) {
  const [church, setChurch] = useState<Church | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState<Partial<Church>>({});

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    loadChurchDetails();
  }, [churchId]);

  const loadChurchDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/churches/${churchId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });

      if (response.ok) {
        const churchData = await response.json();
        setChurch(churchData);
        setFormData(churchData);
      } else {
        setError('Failed to load church details');
      }
    } catch (err) {
      setError('Network error while loading church details');
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(church || {});
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    
    try {
      const response = await fetch(`http://localhost:3000/churches/${churchId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedChurch = await response.json();
        setChurch(updatedChurch);
        setFormData(updatedChurch);
        setEditing(false);
        setSuccess('Church details updated successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update church details');
      }
    } catch (err) {
      setError('Network error while updating church details');
    }
    setSaving(false);
  };

  const handleInputChange = (field: keyof Church, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Box sx={{ pt: 10, width: '100%' }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Loading church details...
            </Typography>
          </Container>
        </Box>
      </Box>
    );
  }

  if (!church) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Box sx={{ pt: 10, width: '100%' }}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Alert severity="error">Church not found</Alert>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Box sx={{ pt: 10, width: '100%' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton onClick={onBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', flexGrow: 1 }}>
              {church.name}
            </Typography>
            {!editing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ ml: 2 }}
              >
                Edit Details
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>

          {/* Alerts */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}

          {/* Church Banner with Logo Overlay */}
          <Card sx={{ mb: 4, position: 'relative' }}>
            <Box
              sx={{
                height: 200,
                backgroundImage: church.banner_url ? `url(${church.banner_url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                position: 'relative'
              }}
            >
              {!church.banner_url && (
                <Typography variant="h6" sx={{ opacity: 0.8 }}>
                  Church Banner
                </Typography>
              )}
              
              {/* Church Logo Overlay */}
              <Avatar
                src={church.logo_url}
                sx={{
                  width: 140,
                  height: 140,
                  position: 'absolute',
                  bottom: -60, // Half the height to create overlay effect
                  left: '10%',
                  transform: 'translateX(-50%)',
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontSize: '2rem',
                  bgcolor: 'background.paper'
                }}
              >
                {church.name?.charAt(0)}
              </Avatar>
            </Box>
            
            {/* Add spacing for the overlapping logo */}
            <Box sx={{ height: 60 }} />
            
            {editing && (
              <CardContent>
                <TextField
                  fullWidth
                  label="Banner Image URL"
                  value={formData.banner_url || ''}
                  onChange={(e) => handleInputChange('banner_url', e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Logo URL"
                  value={formData.logo_url || ''}
                  onChange={(e) => handleInputChange('logo_url', e.target.value)}
                  placeholder="https://example.com/logo.jpg"
                />
              </CardContent>
            )}
          </Card>

          {/* Church Details */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main', mb: 3 }}>
                Church Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Basic Info Row */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="Church Name"
                    value={editing ? (formData.name || '') : church.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!editing}
                    sx={{ flex: 1, minWidth: 250 }}
                  />
                </Box>

                {/* Address */}
                <TextField
                  fullWidth
                  label="Address"
                  value={editing ? (formData.address || '') : (church.address || '')}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!editing}
                />
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="City"
                    value={editing ? (formData.city || '') : (church.city || '')}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!editing}
                    sx={{ flex: 1, minWidth: 150 }}
                  />
                  <TextField
                    label="State"
                    value={editing ? (formData.state || '') : (church.state || '')}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!editing}
                    sx={{ flex: 1, minWidth: 100 }}
                  />
                  <TextField
                    label="ZIP Code"
                    value={editing ? (formData.zip || '') : (church.zip || '')}
                    onChange={(e) => handleInputChange('zip', e.target.value)}
                    disabled={!editing}
                    sx={{ flex: 1, minWidth: 100 }}
                  />
                </Box>

                {/* Contact Info */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="Contact Email"
                    type="email"
                    value={editing ? (formData.contact_email || '') : (church.contact_email || '')}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                    disabled={!editing}
                    sx={{ flex: 1, minWidth: 250 }}
                  />
                  <TextField
                    label="Contact Phone"
                    value={editing ? (formData.contact_phone || '') : (church.contact_phone || '')}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                    disabled={!editing}
                    sx={{ flex: 1, minWidth: 200 }}
                  />
                </Box>

                {/* Website */}
                <TextField
                  fullWidth
                  label="Website"
                  value={editing ? (formData.website || '') : (church.website || '')}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!editing}
                  placeholder="https://yourchurch.com"
                />

                {/* Description */}
                <TextField
                  fullWidth
                  label="Church Description"
                  multiline
                  rows={3}
                  value={editing ? (formData.description || '') : (church.description || '')}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!editing}
                  placeholder="Tell us about your church community..."
                />
              </Box>
            </CardContent>
          </Card>

          {/* Leadership */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main', mb: 3 }}>
                Church Leadership
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {/* Senior Pastor */}
                <Box sx={{ flex: 1, minWidth: 250, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    <Avatar
                      src={church.senior_pastor_avatar}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                    >
                      {church.senior_pastor?.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Senior Pastor
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Senior Pastor Name"
                    value={editing ? (formData.senior_pastor || '') : church.senior_pastor}
                    onChange={(e) => handleInputChange('senior_pastor', e.target.value)}
                    disabled={!editing}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Senior Pastor Avatar URL"
                    value={editing ? (formData.senior_pastor_avatar || '') : (church.senior_pastor_avatar || '')}
                    onChange={(e) => handleInputChange('senior_pastor_avatar', e.target.value)}
                    disabled={!editing}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </Box>

                {/* Pastor */}
                <Box sx={{ flex: 1, minWidth: 250, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    <Avatar
                      src={church.pastor_avatar}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                    >
                      {church.pastor?.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Pastor
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Pastor Name"
                    value={editing ? (formData.pastor || '') : (church.pastor || '')}
                    onChange={(e) => handleInputChange('pastor', e.target.value)}
                    disabled={!editing}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Pastor Avatar URL"
                    value={editing ? (formData.pastor_avatar || '') : (church.pastor_avatar || '')}
                    onChange={(e) => handleInputChange('pastor_avatar', e.target.value)}
                    disabled={!editing}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </Box>

                {/* Assistant Pastor */}
                <Box sx={{ flex: 1, minWidth: 250, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    <Avatar
                      src={church.assistant_pastor_avatar}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                    >
                      {church.assistant_pastor?.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Assistant Pastor
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Assistant Pastor Name"
                    value={editing ? (formData.assistant_pastor || '') : (church.assistant_pastor || '')}
                    onChange={(e) => handleInputChange('assistant_pastor', e.target.value)}
                    disabled={!editing}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Assistant Pastor Avatar URL"
                    value={editing ? (formData.assistant_pastor_avatar || '') : (church.assistant_pastor_avatar || '')}
                    onChange={(e) => handleInputChange('assistant_pastor_avatar', e.target.value)}
                    disabled={!editing}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Future: Events and Announcements sections will go here */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2 }}>
                📅 Events & Announcements
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Event and announcement management will be available here soon.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

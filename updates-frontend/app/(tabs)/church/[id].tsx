import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { apiService, Church, Event, Announcement } from '@/services/api';

export default function ChurchScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [church, setChurch] = useState<Church | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChurchData();
  }, [id]);

  const loadChurchData = async () => {
    try {
      const churchId = parseInt(id as string);
      
      // Load church details, events, and announcements in parallel
      const [churchData, eventsData, announcementsData] = await Promise.all([
        apiService.getChurch(churchId),
        apiService.getEventsByChurch(churchId),
        apiService.getAnnouncementsByChurch(churchId)
      ]);

      setChurch(churchData);
      setEvents(eventsData);
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error loading church data:', error);
      Alert.alert('Error', 'Failed to load church information');
    } finally {
      setLoading(false);
    }
  };

  const handleEventPress = (eventId: number) => {
    router.push(`/(tabs)/event_details?id=${eventId}`);
  };

  const handleWebsitePress = () => {
    if (church?.website) {
      Linking.openURL(church.website);
    }
  };

  const handlePhonePress = () => {
    if (church?.contact_phone) {
      Linking.openURL(`tel:${church.contact_phone}`);
    }
  };

  const handleEmailPress = () => {
    if (church?.contact_email) {
      Linking.openURL(`mailto:${church.contact_email}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading church information...</Text>
      </View>
    );
  }

  if (!church) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Church not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Church</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Church Banner */}
        {church.banner_url && (
          <Image source={{ uri: church.banner_url }} style={styles.bannerImage} />
        )}

        {/* Church Header */}
        <View style={styles.churchHeader}>
          {church.logo_url && (
            <Image source={{ uri: church.logo_url }} style={styles.churchAvatar} />
          )}
          <View style={styles.churchInfo}>
            <Text style={styles.churchName}>{church.name}</Text>
            <Text style={styles.location}>
              {[church.address, church.city, church.state].filter(Boolean).join(', ')}
            </Text>
          </View>
        </View>

        {/* Leadership Section */}
        {(church.senior_pastor || church.pastor || church.assistant_pastor) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leadership</Text>
            
            {church.senior_pastor && (
              <View style={styles.leadershipItem}>
                {church.senior_pastor_avatar ? (
                  <Image 
                    source={{ uri: church.senior_pastor_avatar }} 
                    style={styles.pastorAvatar}
                  />
                ) : (
                  <View style={[styles.pastorAvatar, styles.defaultAvatar]}>
                    <Text style={styles.avatarInitials}>
                      {church.senior_pastor.split(' ').map(name => name[0]).join('').toUpperCase()}
                    </Text>
                  </View>
                )}
                <View style={styles.leadershipInfo}>
                  <Text style={styles.leadershipRole}>Senior Pastor</Text>
                  <Text style={styles.leadershipName}>{church.senior_pastor}</Text>
                </View>
              </View>
            )}
            
            {church.pastor && (
              <View style={styles.leadershipItem}>
                {church.pastor_avatar ? (
                  <Image 
                    source={{ uri: church.pastor_avatar }} 
                    style={styles.pastorAvatar}
                  />
                ) : (
                  <View style={[styles.pastorAvatar, styles.defaultAvatar]}>
                    <Text style={styles.avatarInitials}>
                      {church.pastor.split(' ').map(name => name[0]).join('').toUpperCase()}
                    </Text>
                  </View>
                )}
                <View style={styles.leadershipInfo}>
                  <Text style={styles.leadershipRole}>Pastor</Text>
                  <Text style={styles.leadershipName}>{church.pastor}</Text>
                </View>
              </View>
            )}
            
            {church.assistant_pastor && (
              <View style={styles.leadershipItem}>
                {church.assistant_pastor_avatar ? (
                  <Image 
                    source={{ uri: church.assistant_pastor_avatar }} 
                    style={styles.pastorAvatar}
                  />
                ) : (
                  <View style={[styles.pastorAvatar, styles.defaultAvatar]}>
                    <Text style={styles.avatarInitials}>
                      {church.assistant_pastor.split(' ').map(name => name[0]).join('').toUpperCase()}
                    </Text>
                  </View>
                )}
                <View style={styles.leadershipInfo}>
                  <Text style={styles.leadershipRole}>Assistant Pastor</Text>
                  <Text style={styles.leadershipName}>{church.assistant_pastor}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          {church.contact_phone && (
            <TouchableOpacity onPress={handlePhonePress}>
              <Text style={styles.contactLink}>{church.contact_phone}</Text>
            </TouchableOpacity>
          )}
          {church.contact_email && (
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.contactLink}>{church.contact_email}</Text>
            </TouchableOpacity>
          )}
          {church.website && (
            <TouchableOpacity onPress={handleWebsitePress}>
              <Text style={styles.contactLink}>{church.website}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Upcoming Events */}
        {events.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {events.slice(0, 3).map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                onPress={() => handleEventPress(event.id)}
              >
                <View style={styles.eventDate}>
                  <Text style={styles.eventDateText}>{formatDate(event.start_datetime)}</Text>
                  <Text style={styles.eventTimeText}>{formatTime(event.start_datetime)}</Text>
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  {event.location && (
                    <Text style={styles.eventLocation}>{event.location}</Text>
                  )}
                  {event.price !== undefined && (
                    <Text style={styles.eventPrice}>
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            {events.length > 3 && (
              <Text style={styles.moreEventsText}>+ {events.length - 3} more events</Text>
            )}
          </View>
        )}

        {/* Announcements */}
        {announcements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            {announcements.slice(0, 3).map((announcement) => (
              <View key={announcement.id} style={styles.announcementCard}>
                <View style={styles.announcementHeader}>
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  <View style={[
                    styles.announcementType,
                    announcement.type === 'special' && styles.specialType,
                    announcement.type === 'weekly' && styles.weeklyType,
                    announcement.type === 'yearly' && styles.yearlyType,
                  ]}>
                    <Text style={styles.announcementTypeText}>
                      {announcement.type ? announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1) : 'General'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.announcementContent}>{announcement.description || ''}</Text>
              </View>
            ))}
            {announcements.length > 3 && (
              <Text style={styles.moreAnnouncementsText}>+ {announcements.length - 3} more announcements</Text>
            )}
          </View>
        )}

        {/* Description */}
        {church.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{church.description}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FFB800',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  churchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  churchAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  churchInfo: {
    flex: 1,
  },
  churchName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 12,
  },
  leadershipText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  leadershipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pastorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  leadershipInfo: {
    flex: 1,
  },
  leadershipRole: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600',
    marginBottom: 2,
  },
  leadershipName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  defaultAvatar: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactLink: {
    fontSize: 16,
    color: '#3498db',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  eventDate: {
    width: 60,
    alignItems: 'center',
    marginRight: 12,
  },
  eventDateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  eventTimeText: {
    fontSize: 12,
    color: '#666',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  eventPrice: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600',
  },
  moreEventsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  announcementCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  announcementType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e9ecef',
  },
  specialType: {
    backgroundColor: '#fff3cd',
  },
  weeklyType: {
    backgroundColor: '#d1ecf1',
  },
  yearlyType: {
    backgroundColor: '#f8d7da',
  },
  announcementTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  announcementContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  moreAnnouncementsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

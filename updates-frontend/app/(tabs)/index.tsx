import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { apiService, Event } from '@/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = async () => {
    try {
      const data = await apiService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading announcements:', error);
      Alert.alert('Error', 'Failed to load updates. Please check if the backend server is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadEvents();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
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

  const handleEventPress = (eventId: number) => {
    router.push({ pathname: '/(tabs)/event_details', params: { id: eventId.toString() } });
  };


  const renderEventCard = (event: Event) => (
    <View key={event.id} style={styles.card}>
      {event.image_url && (
        <TouchableOpacity onPress={() => handleEventPress(event.id)}>
          <Image
            source={{ uri: event.image_url }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{event.title}</Text>
        {event.start_datetime && (
          <View style={styles.dateTimeContainer}>
            {event.church_logo && (
              <Image
                source={{ uri: event.church_logo }}
                style={styles.churchLogoCircle}
              />
            )}
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateText}>
                {formatDate(event.start_datetime)} @ {formatTime(event.start_datetime)}
              </Text>
            </View>
          </View>
        )}
        {event.church_name && (
          <View style={styles.churchContainer}>
            <Text style={styles.churchName}>{event.church_name}</Text>
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading updates...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Updates</Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {events.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events available</Text>
            <Text style={styles.emptySubtext}>
              Make sure your backend server is running on localhost:3000
            </Text>
          </View>
        ) : (
          events.map(renderEventCard)
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  churchLogoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  dateTextContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  churchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  churchName: {
    fontSize: 12,
    color: '#FFB800',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  locationContainer: {
    marginTop: 8,
  },
});

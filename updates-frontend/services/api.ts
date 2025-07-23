const API_BASE_URL = 'http://localhost:3000/api';

export interface Church {
  id: number;
  name: string;
  senior_pastor: string;
  pastor?: string;
  assistant_pastor?: string;
  senior_pastor_avatar?: string;
  pastor_avatar?: string;
  assistant_pastor_avatar?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contact_email: string;
  contact_phone: string;
  website?: string;
  logo_url?: string;
  banner_url?: string;
  description?: string;
}

export interface Announcement {
  id: number;
  church_id: number;
  title: string;
  description?: string;
  image_url?: string;
  posted_at?: string;
  type?: string;
  subcategory?: string;
  start_time?: string;
  end_time?: string;
  recurrence_rule?: string;
  is_special: boolean;
  church_name?: string;
  church_logo?: string;
}

export interface Event {
  id: number;
  church_id: number;
  title: string;
  description?: string;
  location?: string;
  start_datetime: string;
  end_datetime?: string;
  image_url?: string;
  price?: number;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  favorites_count?: number;
  church_name?: string;
  church_logo?: string;
}

export interface Donation {
  id: number;
  church_id: number;
  method: string;
  contact_name?: string;
  contact_info: string;
  note?: string;
}

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Churches
  async getChurches(): Promise<Church[]> {
    return this.fetchApi<Church[]>('/churches');
  }

  async getChurch(id: number): Promise<Church> {
    return this.fetchApi<Church>(`/churches/${id}`);
  }

  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return this.fetchApi<Announcement[]>('/announcements');
  }

  async getFeaturedAnnouncements(): Promise<Announcement[]> {
    return this.fetchApi<Announcement[]>('/announcements?special=true');
  }

  async getAnnouncementsByType(type: string): Promise<Announcement[]> {
    return this.fetchApi<Announcement[]>(`/announcements?type=${type}`);
  }

  async getAnnouncementsByChurch(churchId: number): Promise<Announcement[]> {
    return this.fetchApi<Announcement[]>(`/announcements?church_id=${churchId}`);
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return this.fetchApi<Event[]>('/events');
  }

  async getEventById(id: number): Promise<Event> {
    return this.fetchApi<Event>(`/events/${id}`);
  }

  async getEventsByChurch(churchId: number): Promise<Event[]> {
    return this.fetchApi<Event[]>(`/churches/${churchId}/events`);
  }

  // Donations
  async getDonationsByChurch(churchId: number): Promise<Donation[]> {
    return this.fetchApi<Donation[]>(`/churches/${churchId}/donations`);
  }
}

export const apiService = new ApiService();

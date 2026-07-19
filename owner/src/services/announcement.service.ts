import { api } from '../lib/api';

export const announcementService = {
  getAnnouncements: async () => {
    const response = await api.get('/announcements');
    return response.data;
  },
  
  createAnnouncement: async (data: any) => {
    const response = await api.post('/announcements', data);
    return response.data;
  }
};

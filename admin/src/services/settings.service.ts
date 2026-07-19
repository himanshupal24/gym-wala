import { api } from '../lib/api';

export const settingsService = {
  getSettings: async () => {
    const response = await api.get('/settings');
    return response.data.data;
  },
  updateSettings: async (group: string, updates: Record<string, any>) => {
    const response = await api.put('/settings', { group, updates });
    return response.data.data;
  }
};

import { api } from '../lib/api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data.data;
  },
  getRevenue: async () => {
    const response = await api.get('/dashboard/revenue');
    return response.data.data;
  },
  getGrowth: async () => {
    const response = await api.get('/dashboard/growth');
    return response.data.data;
  }
};

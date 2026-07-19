import { api } from '../lib/api';

export const reportsService = {
  getDashboardStats: async () => {
    const response = await api.get('/reports/dashboard');
    return response.data;
  },
  getRevenueChart: async () => {
    const response = await api.get('/reports/revenue-chart');
    return response.data;
  }
};

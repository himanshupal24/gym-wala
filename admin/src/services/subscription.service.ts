import { api } from '../lib/api';

export const subscriptionService = {
  getPlans: async () => {
    const response = await api.get('/subscriptions/plans');
    return response.data.data;
  },
  getSubscriptions: async () => {
    const response = await api.get('/subscriptions');
    return response.data.data;
  }
};

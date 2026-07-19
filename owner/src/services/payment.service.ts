import { api } from '../lib/api';

export const paymentService = {
  getPayments: async () => {
    const response = await api.get('/payments');
    return response.data;
  },
  
  recordPayment: async (data: any) => {
    const response = await api.post('/payments', data);
    return response.data;
  }
};

import { api } from '../lib/api';

export const staffService = {
  getStaff: async () => {
    const response = await api.get('/staff');
    return response.data;
  },
  
  createStaff: async (data: any) => {
    const response = await api.post('/staff', data);
    return response.data;
  }
};

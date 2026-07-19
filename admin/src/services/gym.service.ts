import { api } from '../lib/api';

export const gymService = {
  getGyms: async (status?: string) => {
    const response = await api.get('/gyms', { params: { status } });
    return response.data.data;
  },
  createGym: async (data: any) => {
    const response = await api.post('/gyms', data);
    return response.data.data;
  },
  updateGymStatus: async (id: string, status: string) => {
    const response = await api.patch(`/gyms/${id}/status`, { status });
    return response.data.data;
  },
  deleteGym: async (id: string) => {
    const response = await api.delete(`/gyms/${id}`);
    return response.data;
  }
};

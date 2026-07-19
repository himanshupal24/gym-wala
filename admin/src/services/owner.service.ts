import { api } from '../lib/api';

export const ownerService = {
  getOwners: async (status?: string) => {
    const response = await api.get('/owners', { params: { status } });
    return response.data.data;
  },
  updateOwnerStatus: async (id: string, status: string) => {
    const response = await api.patch(`/owners/${id}/status`, { status });
    return response.data.data;
  },
  deleteOwner: async (id: string) => {
    const response = await api.delete(`/owners/${id}`);
    return response.data;
  }
};

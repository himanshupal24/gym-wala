import { api } from '../lib/api';

export const memberService = {
  getMembers: async (status?: string) => {
    const response = await api.get('/members', { params: { status } });
    return response.data;
  },
  
  createMember: async (data: any) => {
    const response = await api.post('/members', data);
    return response.data;
  },
  
  updateMember: async (id: string, data: any) => {
    const response = await api.put(`/members/${id}`, data);
    return response.data;
  },
  
  deleteMember: async (id: string) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  },
  
  getAnalytics: async () => {
    const response = await api.get('/members/analytics');
    return response.data;
  }
};

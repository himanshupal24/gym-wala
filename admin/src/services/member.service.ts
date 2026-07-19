import { api } from '../lib/api';

export const memberService = {
  getMembers: async (status?: string) => {
    const response = await api.get('/members', { params: { status } });
    return response.data.data;
  },
  getAnalytics: async () => {
    const response = await api.get('/members/analytics');
    return response.data.data;
  },
  updateMemberStatus: async (id: string, status: string) => {
    const response = await api.patch(`/members/${id}/status`, { status });
    return response.data.data;
  }
};

import { api } from '../lib/api';

export const attendanceService = {
  getAttendance: async (date?: string) => {
    const params = date ? { date } : {};
    const response = await api.get('/attendance', { params });
    return response.data;
  },
  
  markAttendance: async (data: { memberId: string, status?: string }) => {
    const response = await api.post('/attendance', data);
    return response.data;
  }
};

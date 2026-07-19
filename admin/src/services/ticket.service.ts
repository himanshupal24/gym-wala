import { api } from '../lib/api';

export const ticketService = {
  getTickets: async (status?: string) => {
    const response = await api.get('/tickets', { params: { status } });
    return response.data.data;
  },
  getTicketDetails: async (id: string) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data.data;
  },
  updateTicketStatus: async (id: string, status: string) => {
    const response = await api.patch(`/tickets/${id}/status`, { status });
    return response.data.data;
  },
  addMessage: async (id: string, message: string) => {
    const response = await api.post(`/tickets/${id}/messages`, { message });
    return response.data.data;
  }
};

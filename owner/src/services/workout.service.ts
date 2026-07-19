import { api } from '../lib/api';

export const workoutService = {
  getWorkouts: async () => {
    const response = await api.get('/workouts');
    return response.data;
  },
  
  createWorkout: async (data: any) => {
    const response = await api.post('/workouts', data);
    return response.data;
  }
};

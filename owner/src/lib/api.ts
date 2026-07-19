import axios from 'axios';

// Get the API URL from environment variables, or fallback to the local API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: allows cookies to be sent with cross-origin requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to handle global API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is 401 Unauthorized, we can clear the auth state
    if (error.response && error.response.status === 401) {
      // We will handle clearing state in the zustand store directly 
      // or redirect to login.
      console.warn('API returned 401 Unauthorized.');
    }
    return Promise.reject(error);
  }
);

import axios from 'axios';

const API_URL = 'http://localhost:8000/user';

export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData, { withCredentials: true });
};

export const login = (userData) => {
    return axios.post(`${API_URL}/login`, userData, { withCredentials: true });
};

export const logout = () => {
    return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

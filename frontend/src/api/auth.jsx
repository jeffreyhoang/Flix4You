import axios from "axios";

// Change this URL if needed (use localhost for local testing)
// const API_BASE_URL = "http://127.0.0.1:8000/api/";   
const API_BASE_URL = "https://flix4u-production.up.railway.app/api/";

// Signup
export const signup = async (userData) => {
    return axios.post(`${API_BASE_URL}signup/`, userData);
};

// Login
export const login = async (credentials) => {
    return axios.post(`${API_BASE_URL}login/`, credentials);
};

// Logout (Black refresh token)
export const logout = async (refreshToken) => {
    return axios.post(`${API_BASE_URL}logout/`, { refresh: refreshToken });
};

// Refresh Token (Get new access token)
export const refreshToken = async (refreshToken) => {
    return axios.post(`${API_BASE_URL}token/refresh/`, { refresh: refreshToken });
};
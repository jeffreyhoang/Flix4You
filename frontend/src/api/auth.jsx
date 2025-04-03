import axios from "axios";
import API_BASE_URL from "@/api/config";

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
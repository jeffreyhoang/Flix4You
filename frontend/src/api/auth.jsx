import axiosInstance from "./axiosInstance";

// Signup
export const signup = async (userData) => {
    return axiosInstance.post("signup/", userData);
};

// Login
export const login = async (credentials) => {
    return axiosInstance.post("login/", credentials);
};

// Logout
export const logout = async (refreshToken) => {
    return axiosInstance.post("logout/", { refresh: refreshToken });
};

// Refresh Token
export const refreshToken = async (refreshToken) => {
    return axiosInstance.post("token/refresh/", { refresh: refreshToken });
};

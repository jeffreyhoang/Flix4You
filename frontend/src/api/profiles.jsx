import axios from "axios";

// Change this URL if needed (use localhost for local testing)
const API_BASE_URL = "http://127.0.0.1:8000/api/";   
//const API_BASE_URL = "https://flix4u-production.up.railway.app/api/";

// Get Authenticated User Details
export const getUser = async (token) => {
    return axios.get(`${API_BASE_URL}user/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// List User Profiles
export const getProfiles = async (token) => {
    return axios.get(`${API_BASE_URL}profile/`, {
        headers: { Authorization: `Bearer ${token}`}
    });
};

// Create a New Profile
 export const createProfile = async (token, profileData) => {
    return axios.post(`${API_BASE_URL}profile/`, profileData, {
        headers: { Authorization: `Bearer ${token}` }  
    });
 };

// Update a User Profile
export const updateProfile = async (token, profileId, updatedData) => {
    return axios.put(`${API_BASE_URL}profile/${profileId}/`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Retrieve a User Profile
export const getProfile = async (token, profileId) => {
    return axios.get(`${API_BASE_URL}profile/${profileId}/`, {
        headers: { Authorization: `Bearer ${token}`}
    });
};

// Select a User Profile (store profile ID in localStorage)
export const selectProfile = (profile) => {
    localStorage.setItem("selected_profile", JSON.stringify(profile));
};

// Delete a User Profile
export const deleteProfile = async (token, profileId) => {
    return axios.delete(`${API_BASE_URL}profile/${profileId}/`, {
        headers: { Authorization: `Bearer ${token}`}
    });
};


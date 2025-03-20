import axios from "axios";
import API_BASE_URL from "./config"; // Import the base URL


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


// Delete a User Profile
export const deleteProfile = async (token, profileId) => {
    return axios.delete(`${API_BASE_URL}profile/${profileId}/`, {
        headers: { Authorization: `Bearer ${token}`}
    });
};


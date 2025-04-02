import axiosInstance from "./axiosInstance";

// Get Authenticated User Details
export const getUser = async () => {
    return axiosInstance.get("user/");
};

// List User Profiles
export const getProfiles = async () => {
    return axiosInstance.get("profile/");
};

// Create a New Profile
export const createProfile = async (profileData) => {
    return axiosInstance.post("profile/", profileData);
};

// Update a User Profile
export const updateProfile = async (profileId, updatedData) => {
    return axiosInstance.put(`profile/${profileId}/`, updatedData);
};

// Retrieve a User Profile
export const getProfile = async (profileId) => {
    return axiosInstance.get(`profile/${profileId}/`);
};

// Delete a User Profile
export const deleteProfile = async (profileId) => {
    return axiosInstance.delete(`profile/${profileId}/`);
};

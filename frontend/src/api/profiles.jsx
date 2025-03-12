import axios from "axios";

// Change this URL if needed (use localhost for local testing)
const API_BASE_URL = "http://127.0.0.1:8000/api";   
//const API_BASE_URL = "https://flix4u-production.up.railway.app/api";

// Get Authenticated User Details
export const getUser = async (token) => {
    return axios.get(`${API_BASE_URL}user/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Create a New Profile

// List User Profiles

// Update a Profile

// Retrive a Profile

// Delete a Profile


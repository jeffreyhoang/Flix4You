import axios from "axios";

// Change this URL if needed (use localhost for local testing)
// const API_BASE_URL = "http://127.0.0.1:8000/api";   
const API_BASE_URL = "https://flix4u-production.up.railway.app";

// Fetch all users
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users: ", error);
        return [];
    }
}

// Fetch all profiles
export const fetchProfiles = async () => {
    try {
        const token = localStorage.getItem("accessToken");  // Use JWT token for auth
        const response = await axios.get(`${API_BASE_URL}/profiles/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching profiles: ", error);
        return [];
    }
};

// Fetch all movies
export const fetchMovies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies/`);
        return response.data; // Returns movie list in JSON
    } catch (error) {
        console.error("Error fetching movies: ", error);
        return [];
    }
};

// Fetch all movies in a watchlist
export const fetchWatchlist = async () => {
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get(`${API_BASE_URL}/watchlist/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching watchlist: ", error);
        return [];
    }
}

// Fetch all movies in a history list
export const fetchHistoryList = async () => {
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get(`${API_BASE_URL}/history/`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching history list: ", error);
        return [];
    }
}


// Fetch all reviews
export const fetchReviews = async () => {
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get(`${API_BASE_URL}/reviews/`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching history list: ", error);
        return [];
    }
}

// Fetch subscription information
export const fetchSubscription = async () => {
    try {
        const token = localStorage.getItem("accessToken")
        const response = await axios.get(`${API_BASE_URL}/subscription/`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching subscription information: ", error);
        return [];
    }
}

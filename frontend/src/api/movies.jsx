import axios from "axios";
import API_BASE_URL from "./config"; // Import the base URL

// List all movies
export const getMovies = async () => {
    return axios.get(`${API_BASE_URL}movies/`);
};
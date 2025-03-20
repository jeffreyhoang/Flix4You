import axios from "axios";

// Change this URL if needed (use localhost for local testing)
const API_BASE_URL = "http://127.0.0.1:8000/api/";   
//const API_BASE_URL = "https://flix4u-production.up.railway.app/api/";

// List all movies
export const getMovies = async () => {
    return axios.get(`${API_BASE_URL}movies/`);
};
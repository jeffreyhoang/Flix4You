import axios from "axios";
import API_BASE_URL from "@/api/config"; // Import the base URL

// List all movies
export const getMovies = async () => {
    return axios.get(`${API_BASE_URL}movies/`);
};

// List all movies by id
export const getMoviesById = async (movieIds) => {
    return axios.get(`${API_BASE_URL}movies/by-ids`, {
        params: { movie_ids: movieIds.join(',') }, 
    });
};

// List all movies by genre
export const getMoviesByGenre = async (token, movieGenre) => {
    return axios.get(`${API_BASE_URL}movies/by-genre`, {
        params: { movie_genre: movieGenre }, 
        headers: { Authorization: `Bearer ${token}` }
    });
}
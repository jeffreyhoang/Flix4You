import axiosInstance from "./axiosInstance";

// List all movies
export const getMovies = async () => {
    return axiosInstance.get("movies/");
};
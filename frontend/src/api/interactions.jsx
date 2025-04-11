import axios from "axios";
import API_BASE_URL from "@/api/config";

// Create a watchlist movie
export const createWatchlistMovie = async (token, profileId, movieId) => {
    return axios.post(`${API_BASE_URL}watchlist/profile/${profileId}/`, 
        { movie: movieId }, 
        { 
            headers: { Authorization: `Bearer ${token}` 
        }
    });
};

// List all profile watchlist movies
export const getWatchlistMovies = async (token, profileId) => {
    return axios.get(`${API_BASE_URL}watchlist/profile/${profileId}/`, { 
            headers: { Authorization: `Bearer ${token}` 
        }
    });
};

// Retrieve a single profile watchlist movie
export const getWatchlistMovie = async (token, profileId, movieId) => {
    return axios.get(`${API_BASE_URL}watchlist/profile/${profileId}/movie/${movieId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Delete a single profile watchlist movie
export const deleteWatchlistMovie = async (token, profileId, movieId) => {
    return axios.delete(`${API_BASE_URL}watchlist/profile/${profileId}/movie/${movieId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Create a like/dislike
export const createLikeDislike = async (token, profileId, movieId, isLike) => {
    return axios.post(`${API_BASE_URL}likedislike/profile/${profileId}/`, {
        movie: movieId,
        is_like: isLike
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Retrieve a single like/dislike
export const getLikeDislike = async (token, profileId, movieId) => {
    return axios.get(`${API_BASE_URL}likedislike/profile/${profileId}/movie/${movieId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// Update a single like/dislike
export const updateLikeDislike = async (token, profileId, movieId, isLike) => {
    return axios.patch(`${API_BASE_URL}likedislike/profile/${profileId}/movie/${movieId}/`, {
        is_like: isLike
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// Delete a single like/dislike
export const deleteLikeDislike = async (token, profileId, movieId) => {
    return axios.delete(`${API_BASE_URL}likedislike/profile/${profileId}/movie/${movieId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// Create a single comment
export const createComment = async (token, profileId, movieId, commentText) => {
    return axios.post(`${API_BASE_URL}comment/profile/${profileId}/`, {
        movie: movieId,
        comment: commentText
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

// Retrive a single comment
// Update a single comment
// Delete a single comment

// List all comments under a movie
export const listComments = async (token, movieId) => {
    return axios.get(`${API_BASE_URL}comment/movie/${movieId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
import React, { useState, useEffect } from "react";
import { getMovies } from "../api/movies"; 
import { useNavigate } from "react-router-dom";

const MovieList = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getMovies();
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const handleSelectMovie = (movie) => {
        localStorage.setItem("selected_movie", JSON.stringify(movie));
        navigate("/display-movie");
    };

    if(loading) {
        return <p>Loading movies...</p>;
    }

    return (
        <div className="movie-list">
            <h2>Movies</h2>
            {movies.map((movie) => (
                <button key={movie.id} className="movie-button" onClick={() => handleSelectMovie(movie)}>
                    <img src={movie.poster_url} alt={movie.title} className="movie-thumbnail" />
                </button>
            ))}
        </div>
    );
};

export default MovieList;

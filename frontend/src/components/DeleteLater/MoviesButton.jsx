import React, { useState } from "react";
import { fetchMovies } from "../api"; // Import API function

const MoviesButton = () => {
    const [movies, setMovies] = useState([]);
    const [showMovies, setShowMovies] = useState(false);

    const handleShowMovies = async () => {
        const data = await fetchMovies(); // Call API function
        setMovies(data);
        setShowMovies(!showMovies);
    };

    return (
        <div>
            <button onClick={handleShowMovies}>
                {showMovies ? "Hide Movies" : "Show Movies"}
            </button>

            {showMovies && (
                <>
                <h3>Movies</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Genre</th>
                            <th>Duration</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.length > 0 ? (
                            movies.map((movie, index) => (
                                <tr key={index}>
                                    <td>{movie.title}</td>
                                    <td>{movie.description}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.duration} minutes</td>
                                    <td>{movie.rating}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No Movies found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
            )}
        </div>
    );
};

export default MoviesButton;

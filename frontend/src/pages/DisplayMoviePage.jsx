import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

const DisplayMoviePage = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const storedMovie = localStorage.getItem("selected_movie");

        if (storedMovie) {
            setMovie(JSON.parse(storedMovie));
        } else {
            navigate("/dashboard"); 
        }
    }, [navigate]);

    if (!movie) {
        return <p>Loading movie...</p>;
    }

    return (
        <div className="movie-container">
            <MovieDetails />
            <button onClick={() => navigate("/dashboard")}>Back</button>
        </div>
    );
};

export default DisplayMoviePage;

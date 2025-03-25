import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieDetails from "../components/movies/MovieDetails";

const MoviePreviewPage = () => {
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
        <div className="">
            <MovieDetails />
            <button onClick={() => navigate("/dashboard")} className="form-button-1">Back</button>
        </div>
    );
};

export default MoviePreviewPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const token = localStorage.getItem("access_token")

    useEffect(() => {
        if(!token) {
            navigate("/");
        }

        const storedMovie = localStorage.getItem("selected_movie");
        
        if(storedMovie) {
            setMovie(JSON.parse(storedMovie));
        } else {
            navigate("/dashbaord");
        }

    }, []);

    if(!movie) {
        return <p>Loading movie...</p>;
    }

    return (
        <div>
            <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong>  {movie.release_date}</p>
            <p><strong>Duration:</strong>  {movie.duration} minutes</p>
            <p><strong>Rating:</strong>  {movie.rating}/5 stars</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Actors:</strong> {movie.actors.map(actor => actor.name).join(", ")}</p>
            <p><strong>Directors:</strong> {movie.directors.map(director => director.name).join(", ")}</p>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
        </div>
    );
}

export default MovieDetails;
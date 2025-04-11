import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieDetails from "../components/movies/MovieDetails";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


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
      <Container className="position-relative dashboard-container">
          <button
            className="close-button bg-transparent text-white border-0 position-absolute top-0 end-0 mt-3 me-2"
            onClick={() => navigate("/dashboard")}
            style={{ zIndex: 10 }} 
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
    
          <MovieDetails />
        </Container>
      );
};

export default MoviePreviewPage;

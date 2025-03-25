import React, { useState, useEffect } from "react";
import { getMovies } from "../../api/movies"; 
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <Container>
            <p2 className="luminate-text text-white text-center fs-7 fw-bold m-4">Movies</p2>
            <Row>
                {movies.map((movie) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={movie.id} className="d-flex justify-content-center align-items-center mb-4">
                        <button className="movie-button p-2" onClick={() => handleSelectMovie(movie)}>
                            <img src={movie.poster_url} alt={movie.title} className="movie-thumbnail" />
                        </button>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MovieList;

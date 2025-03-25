import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

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
            console.log(movie)
        } else {
            navigate("/dashboard");
        }

    }, []);

    if(!movie) {
        return <p>Loading movie...</p>;
    }

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

    function convertMinutesToHours(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
          

    return (
        <Container className="dashboard-container ps-4 pe-4 vh-100">
            <Row className="bg-dark">
                <VideoPlayer
                    src={movie.movie_url}
                />
            </Row>
            <Row className="bg-warning">
                <h1><strong>{movie.title}</strong></h1>
            </Row>
            <Row>
                <Col className="bg-info">
                    <p><strong>Released:</strong> {formatDate(movie.release_date)}</p>
                </Col>
                <Col className="bg-danger">
                    <p><strong>Rating:</strong> {movie.rating}/5</p>
                </Col>
                <Col className="bg-success">
                    <p><strong>Duration:</strong> {convertMinutesToHours(movie.duration)}</p>
                </Col>
                <Col className="bg-secondary">
                    <p><strong>IMDB Rating:</strong></p>
                </Col>
            </Row>
            <Row>
                <Button className="custom-gradient-btn-1">Play</Button>
            </Row>
            <Row>
                <Button className="custom-gradient-btn-2">Download</Button>
            </Row>
            <Row>
                <p>{movie.description}</p>
            </Row>
            <Row className="bg-warning">
                <p><strong>Actors:</strong> {movie.actors.map(actor => actor.name).join(", ")}</p>
            </Row>
            <Row className="bg-info">
                <p><strong>Directors:</strong> {movie.directors.map(director => director.name).join(", ")}</p>
            </Row>
            <Row>
                <Col>
                    <Button>Watchlist (+)</Button>
                </Col>
                <Col>
                    <Button>Rate</Button>
                </Col>
                <Col>
                    <Button>Comment</Button>
                </Col>
            </Row>
        </Container>

        /*<div>
            <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong>  {movie.release_date}</p>
            <p><strong>Duration:</strong>  {movie.duration} minutes</p>
            <p><strong>Rating:</strong>  {movie.rating}/5 stars</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Actors:</strong> {movie.actors.map(actor => actor.name).join(", ")}</p>
            <p><strong>Directors:</strong> {movie.directors.map(director => director.name).join(", ")}</p>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
            <VideoPlayer
                src={movie.movie_url}
            />
        </div>*/
    );
}

export default MovieDetails;
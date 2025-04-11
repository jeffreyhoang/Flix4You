import {React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies, getMoviesById, getMoviesByGenre } from "@/api/movies"; 
import { getWatchlistMovies } from "@/api/interactions";

import WatchlistMovies from "@/components/movies/WatchlistMovies";
import GenreMovies from "@/components/movies/GenreMovies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';

const MovieList = () => {
    const navigate = useNavigate();
    const [allMovies, setAllMovies] = useState([]);
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [adventureMovies, setAdventureMovies] = useState([]);

    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token");
    const profile = localStorage.getItem("selected_profile");
    const profileId = JSON.parse(profile).id;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch movie data
                const allMoviesResponse = await getMovies();
                const dramaResponse = await getMoviesByGenre(token, "Drama");
                const comedyResponse = await getMoviesByGenre(token, "Comedy");
                const horrorResponse = await getMoviesByGenre(token, "Horror");
                const adventureResponse = await getMoviesByGenre(token, "Adventure");


                // Fetch and set watchlist movie data to state
                const movieIdsResponse = await getWatchlistMovies(token, profileId);
                const movieIds = movieIdsResponse.data.map(item => item.movie);   
                if (movieIds.length > 0) {
                    const movieDetailsResponse = await getMoviesById(movieIds); 
                    setWatchlistMovies(movieDetailsResponse.data); 
                }

                // Set the fetched data to state
                setAllMovies(allMoviesResponse.data);
                setDramaMovies(dramaResponse.data);
                setComedyMovies(comedyResponse.data);
                setHorrorMovies(horrorResponse.data);
                setAdventureMovies(adventureResponse.data);
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
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Spinner animation="border" variant="danger" style={{ width: '6rem', height: '6rem' }}/>
            </div>
        )
    }

    return (
        <Container>
            <p className="luminate-text text-white text-center fs-7 fw-bold pt-5">Movies</p>
            {watchlistMovies.length > 0 && (
                <Row>
                    <WatchlistMovies movies={watchlistMovies} />
                </Row>
            )}
            <Row>
                <GenreMovies movies={dramaMovies} genre={"Drama"} />
            </Row>
            <Row>
                <GenreMovies movies={comedyMovies} genre={"Comedy"} />
            </Row>
            <Row>
                <GenreMovies movies={horrorMovies} genre={"Horror"} />
            </Row>
            <Row>
                <GenreMovies movies={adventureMovies} genre={"Adventure"} />
            </Row>
            <Row>
                <p className="text-start"><strong>All Movies</strong></p>
                {allMovies.map((movie) => (
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

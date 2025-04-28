import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMovies, getMoviesById, getMoviesByGenre } from "@/api/movies"; 
import { getWatchlistMovies } from "@/api/interactions";

import WatchlistMovies from "@/components/movies/WatchlistMovies";
import GenreMovies from "@/components/movies/GenreMovies";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';

const MovieList = ({ searchTerm = "" }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const profile = localStorage.getItem("selected_profile");
    const profileId = JSON.parse(profile).id;
    const genres = ["Drama", "Comedy", "Horror", "Adventure"];

    // All movies
    const { data: allMoviesRes, isLoading: loadingAll} = useQuery({
        queryKey: ["allMovies"],
        queryFn: getMovies,
        staleTime: 1000 * 60 * 5,
    });

    // Genre movies
    const genreQueries = genres.map((genre) => ({
        genre,
        ...useQuery({
          queryKey: ["genre", genre],
          queryFn: () => getMoviesByGenre(token, genre),
          staleTime: 1000 * 60 * 5,
        }),
      }));    

    // Watchlist IDs
    const { data: watchlistIdsRes } = useQuery({
        queryKey: ["watchlistMovieIds", profileId],
        queryFn: () => getWatchlistMovies(token, profileId),
        staleTime: 1000 * 60 * 5,
    });

    // Maps watchlist IDs to an array
    const watchlistIds = Array.isArray(watchlistIdsRes?.data)
    ? watchlistIdsRes.data.map((item) => item.movie)
    : [];

    // Watchlist movies
    const { data: watchlistRes, isLoading: loadingWatchlist } = useQuery({
        queryKey: ["watchlistMovies", watchlistIds],
        queryFn: () => getMoviesById(watchlistIds),
        enabled: !! watchlistIds.length > 0,
        staleTime: 1000 * 60 * 5,
    })

    // Display a loading spinner animation while movies are loading
    if(loadingAll) {
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Spinner animation="border" variant="danger" style={{ width: '6rem', height: '6rem' }}/>
            </div>
        )
    }

    // Extract .data from queries
    const allMovies = allMoviesRes?.data || []
    const filteredMovies = searchTerm.trim()
    ? allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : allMovies;
    const watchlistMovies = watchlistRes?.data || [];

    // Save selected movie to local storage
    const handleSelectMovie = (movie) => {
        localStorage.setItem("selected_movie", JSON.stringify(movie))
        navigate("/display-movie")
    }

    return (
        <Container>
            <p className="luminate-text text-white text-center fs-7 fw-bold pt-5">Movies</p>
            <Row>
                <p className="text-start"><strong>All Movies</strong></p>
                {filteredMovies.length === 0 && (
                    <p className="text-center text-white">No movies found for "{searchTerm}"</p>
                )}

                {filteredMovies.map((movie) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={movie.id} className="d-flex justify-content-center align-items-center mb-4">
                        <button className="movie-button p-2" onClick={() => handleSelectMovie(movie)}>
                            <img src={movie.poster_url} alt={movie.title} className="movie-thumbnail" />
                        </button>
                    </Col>
                ))}
                
            </Row>
            <Row>
                {loadingWatchlist ? (
                    <div className="d-flex justify-content-center align-items-center py-4 w-100">
                        <Spinner animation="border" variant="light" />
                    </div>                
                ) : (
                    watchlistMovies.length > 0 && <WatchlistMovies movies={watchlistMovies} />
                )}
            </Row>

            {genreQueries.map(({ genre, data, isLoading }) => (
                <Row key={genre}>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center py-4 w-100">
                            <Spinner animation="border" variant="secondary" />
                        </div>
                    ) : (
                        <GenreMovies movies={data?.data || []} genre={genre} />
                    )}
                </Row>
            ))}
        </Container>
    );
};

export default MovieList;
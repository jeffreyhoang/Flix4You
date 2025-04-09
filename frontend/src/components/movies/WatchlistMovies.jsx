import { React } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const WatchlistMovies = ({ movies }) => {
    const navigate = useNavigate();

    const handleSelectMovie = (movie) => {
        localStorage.setItem("selected_movie", JSON.stringify(movie));
        navigate("/display-movie");
    };

    return (
        <Container>
            <p className="text-start"><strong>Watchlist</strong></p>
            <div className="watchlist-container">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <button className="movie-button p-2" onClick={() => handleSelectMovie(movie)}>
                            <img src={movie.poster_url} alt={movie.title} className="movie-thumbnail" />
                        </button>
                    </div>
                ))}
            </div>
        </Container>
    )
};

export default WatchlistMovies;


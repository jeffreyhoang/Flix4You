import { React } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const GenreMovies = ({ movies, genre }) => {
    const navigate = useNavigate();

    // Saved selected movies to local storage
    const handleSelectMovie = (movie) => {
        localStorage.setItem("selected_movie", JSON.stringify(movie));
        navigate("/display-movie");
    };

    return (
        <Container>
            <p className="text-start"><strong>{genre}</strong></p>
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

export default GenreMovies;
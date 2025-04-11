import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as faCommentRegular } from "@fortawesome/free-regular-svg-icons";
import VideoPlayer from "@/components/movies/VideoPlayer";
import AddWatchlistButton from "@/components/buttons/AddWatchlistButton";
import AddLikedislikeButton from "@/components/buttons/AddLikedislikeButton";
import PlayButton from "@/components/buttons/PlayButton";
import DownloadButton from "@/components/buttons/DownloadButton";
import LikesDislikesCount from "@/components/interactions/LikesDislikesCount";

const MovieDetails = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [profile, setProfile] = useState(null);
    const token = localStorage.getItem("access_token")
    const videoRef = useRef(null);

    useEffect(() => {
        if(!token) {
            navigate("/");
        }

        const storedMovie = localStorage.getItem("selected_movie");
        const storedProfile = localStorage.getItem("selected_profile");
        
        if(storedMovie) {
            setMovie(JSON.parse(storedMovie));
        } else {
            navigate("/dashboard");
        }
        if(storedProfile) {
            setProfile(JSON.parse(storedProfile));
        } else {
            navigate("/dashboard");
        }

    }, []);

    if(!movie) {
        return <p>Loading movie...</p>;
    }

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric"
        });

    function convertMinutesToHours(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    return (
        <Container>
            <Row className="text-center pt-4">
                <VideoPlayer src={movie.movie_url} videoRef={videoRef} />
            </Row>
            <Row>
                <h2><strong>{movie.title}</strong></h2>
            </Row>
            <Row className="justify-content-start gap-2">
                <Col xs="auto" className="text-start">
                    <p>{formatDate(movie.release_date)}</p>
                </Col>
                <Col xs="auto" className="text-start">
                    <p className="bg-secondary text-white px-1 rounded-1 ">
                    {movie.rating}
                    </p>
                </Col>
                <Col xs="auto" className="text-start">
                    <p>{convertMinutesToHours(movie.duration)}</p>
                </Col>
                <Col xs="auto" className="text-start">
                    <p><strong>IMDb {movie.imdbRating}</strong></p>
                </Col>
                <Col xs="auto" className="text-start">
                    <LikesDislikesCount token={token} movieId={movie.id} isLike={true} />                
                </Col>
                <Col xs="auto" className="text-start">
                    <LikesDislikesCount token={token} movieId={movie.id} isLike={false} />                
                </Col>
            </Row>
            <Row className="pt-2">
                <PlayButton videoRef={videoRef} />
            </Row>
            <Row className="pt-2">
                <DownloadButton movie={movie}/>
            </Row>
            <Row className="pt-2">
                <p>{movie.description}</p>
            </Row>
            <Row>
                <p className="fc-grey fs-0"><strong>Cast:</strong> {movie.actors.map(actor => actor.name).join(", ")}</p>
            </Row>
            <Row>
                <p className="fc-grey fs-0"><strong>Directors:</strong> {movie.directors.map(director => director.name).join(", ")}</p>
            </Row>
            <Row className="justify-content-start">
                <Col xs="auto">
                    <AddWatchlistButton token={token} profileId={profile.id} movieId={movie.id} />
                </Col>
                <Col xs="auto">
                    <AddLikedislikeButton token={token} profileId={profile.id} movieId={movie.id} />
                </Col>
                <Col xs="auto">
                    <Button variant="link" className="text-white p-2 d-flex flex-column text-decoration-none" onClick={() => navigate("/comment")}>
                        <FontAwesomeIcon icon={faCommentRegular} />
                        <span className="fs--1">Comment</span>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieDetails;
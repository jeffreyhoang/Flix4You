import React from "react";
import { useNavigate } from "react-router-dom";
import CommentForm from "@/components/forms/CommentForm";
import CommentList from "@/components/interactions/commentList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const CommentPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const storedProfile = localStorage.getItem("selected_profile")
    const profileId = JSON.parse(storedProfile).id
    const storedMovie = localStorage.getItem("selected_movie");
    const movieId = JSON.parse(storedMovie).id


    return (
        <Container className="position-relative dashboard-container p-4">
            <button
                className="close-button bg-transparent text-white border-0 position-absolute top-0 end-0 mt-3 me-2"
                onClick={() => navigate("/display-movie")}
                style={{ zIndex: 10 }} 
            >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
            <Row>
                <h3>Comments</h3>
            </Row>
            <Row>
                <CommentForm token={token} profileId={profileId} movieId={movieId} />
            </Row>
            <Row className="mt-4">
                <CommentList token={token} movieId={movieId} />
            </Row>
        </Container>
    );
};

export default CommentPage;

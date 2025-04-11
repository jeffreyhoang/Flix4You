import React from "react";
import CommentForm from "@/components/forms/CommentForm";
import CommentList from "@/components/comments/commentList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


const CommentPage = () => {
    const token = localStorage.getItem("access_token");
    const storedProfile = localStorage.getItem("selected_profile")
    const profileId = JSON.parse(storedProfile).id
    const storedMovie = localStorage.getItem("selected_movie");
    const movieId = JSON.parse(storedMovie).id


    return (
        <Container className="dashboard-container p-4">
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

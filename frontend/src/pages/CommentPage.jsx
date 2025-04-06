import React from "react";
import CommentForm from "@/components/forms/CommentForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


const CommentPage = () => {
    const token = localStorage.getItem("access_token");
    const storedProfile = localStorage.getItem("selected_profile")
    const profileId = JSON.parse(storedProfile).id
    const storedMovie = localStorage.getItem("selected_movie");
    const movieId = JSON.parse(storedMovie).id


    return (
        <Container>
            <CommentForm token={token} profileId={profileId} movieId={movieId} />
        </Container>
    );
};

export default CommentPage;

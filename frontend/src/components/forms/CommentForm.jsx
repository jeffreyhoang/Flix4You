import { React, useState } from "react";
import { createComment } from "@/api/interactions";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CommentForm = ( {token, profileId, movieId} ) => {
    const [commentText, setCommentText] = useState("");

    const handleChange = (e) => {
        setCommentText(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createComment(token, profileId, movieId, commentText);
            window.location.reload();
        } catch (error) {
            console.log("Comment failed: ", error);
        }
    };

    return (
        <Container className="comment-form-container text-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Post a comment..." 
                        className="input-box" 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="custom-gradient-btn-1 mt-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm
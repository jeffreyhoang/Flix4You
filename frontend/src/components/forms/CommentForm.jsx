import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "@/api/interactions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CommentForm = ( {token, profileId, movieId} ) => {
    const [commentText, setCommentText] = useState("");

    const handleChange = (e) => {
        setCommentText(e.target.value)
    };

    const handleSubmit = async (e) => {
        try {
            await createComment(token, profileId, movieId, commentText);
            alert("Comment successful...");
        } catch (error) {
            console.log("Comment failed: ", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={handleChange}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default CommentForm
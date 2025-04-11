import { React, useEffect, useState } from "react";
import { listComments } from "@/api/interactions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";


const CommentList = ({ token, movieId }) => {
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await listComments(token, movieId);
                setCommentList(response.data);
            } catch (error) {
                console.log("Failed loading comments", error);
            }
        }
        fetchComments();
    }, [token, movieId])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    return (
        <Container>
            {[...commentList].reverse().map((comment, index) => (
                <Row key={comment.id}>
                    <Col xs="auto">
                        <FontAwesomeIcon icon={faCircleUser} className="profile-icon" style={{ fontSize: "2rem" }} />
                    </Col>
                    <Col>
                        <p>{comment.comment}</p>
                        <p className="comment-date-text">Posted: {formatDate(comment.added_at)}</p>
                    </Col>
                    {index < commentList.length - 1 && <div className="comment-divider"></div>}
                </Row>
            ))}
        </Container>
    )
}

export default CommentList;
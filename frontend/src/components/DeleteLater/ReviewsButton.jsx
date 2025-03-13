import React, { useState } from "react";
import { fetchReviews } from "../../api"; 

const ReviewsButton = () => {
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);

    const handleShowReviews = async () => {
        const data = await fetchReviews();   // Call API function
        setReviews(data);
        setShowReviews(!showReviews);
    };

    return (
        <div>
            <button onClick={handleShowReviews}>
                {showReviews ? "Hide Reviews" : "Show Reviews"}
            </button>

            {showReviews && (
                <>
                    <h3>My Reviews</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Movie</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <tr key={review.id}>
                                        <td>{review.profile}</td>
                                        <td>{review.movie}</td>
                                        <td>{review.rating}/5</td>
                                        <td>{review.comment || "No comment"}</td>
                                        <td>{new Date(review.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No reviews found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ReviewsButton
import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { countLikesDislikes } from "@/api/interactions";

const LikesDislikesCount = ({ token, movieId, isLike }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchNumLikes = async () => {
            try {
                const response = await countLikesDislikes(token, movieId);
                setCount(isLike ? response.data.like_count : response.data.dislike_count);
            } catch (error) {
                console.log("Failed to fetch number of likes/dislikes: ", error);
            }
        }
        fetchNumLikes();
    }, [movieId, isLike]);

    return (
        <div>
            {isLike ? <FontAwesomeIcon icon={faThumbsUp} /> : <FontAwesomeIcon icon={faThumbsDown} />}
            <span> {count}</span>
        </div>
    )
};

export default LikesDislikesCount;
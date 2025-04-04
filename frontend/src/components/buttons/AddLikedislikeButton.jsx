import { React, useState, useEffect } from "react";
import { createLikeDislike, getLikeDislike, updateLikeDislike, deleteLikeDislike } from "@/api/interactions";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular, faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";


const AddLikedislikeButton = ({ token, profileId, movieId }) => {
    const [ratingStatus, setRatingStatus] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const checkRatingStatus = async () => {
            try {
                const result = await getLikeDislike(token, profileId, movieId);
                if(result.data.is_like) {
                    setRatingStatus(true);
                } else {
                    setRatingStatus(false);
                }
            } catch (error) {
                setRatingStatus(null);
            }
        }
        checkRatingStatus();
    }, [token, profileId, movieId])

    const toggleShowOptions = () => {
        setShowOptions(!showOptions);
    }

    const toggleRatingStatus = async (rating) => {
        if(ratingStatus == null) {
            if(rating) {
                await createLikeDislike(token, profileId, movieId, true);
                setRatingStatus(true);
            } else {
                await createLikeDislike(token, profileId, movieId, false);
                setRatingStatus(false);
            }
        } else if(ratingStatus) {
            if(rating) {
                await deleteLikeDislike(token, profileId, movieId);
                setRatingStatus(null);
            } else {
                await updateLikeDislike(token, profileId, movieId, false);
                setRatingStatus(false);
            }
        } else {
            if(rating) {
                await updateLikeDislike(token, profileId, movieId, true);
                setRatingStatus(true);
            } else {
                await deleteLikeDislike(token, profileId, movieId);
                setRatingStatus(null);
            }
        }
        toggleShowOptions();
    }
    
    return (
        <div className="position-relative d-inline-block">
            {showOptions && (
                <div className="rate-button position-absolute bg-dark rounded px-2 py-1 shadow d-flex gap-2">
                    <Button variant="link" className="text-white p-2 d-flex flex-column text-decoration-none" onClick={() => toggleRatingStatus(true)}>
                        <FontAwesomeIcon icon={ratingStatus === true ? faThumbsUp : faThumbsUpRegular} />
                    </Button>
                    <Button variant="link" className="text-white p-2 d-flex flex-column text-decoration-none" onClick={() => toggleRatingStatus(false)}>
                        <FontAwesomeIcon icon={ratingStatus === false ? faThumbsDown : faThumbsDownRegular} />
                    </Button>
                </div>
            )}
            <Button variant="link" className="text-white p-2 d-flex flex-column text-decoration-none" onClick={toggleShowOptions}>
                {ratingStatus === true ? (<FontAwesomeIcon icon={faThumbsUp} />) : ratingStatus === false ? (<FontAwesomeIcon icon={faThumbsDown} />) : (<FontAwesomeIcon icon={faThumbsUpRegular} />)}
                <span className="fs--1">Rate</span>
            </Button>
        </div>
    )
};

export default AddLikedislikeButton;
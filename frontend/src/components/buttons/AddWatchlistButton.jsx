import { React, useState, useEffect } from "react";
import { createWatchlistMovie, getWatchlistMovie, deleteWatchlistMovie } from "@/api/interactions";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";


const AddWatchlistButton = ({ token, profileId, movieId }) => {
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        const checkWatchlist = async () => {
            try {
                await getWatchlistMovie(token, profileId, movieId);
                setInWatchlist(true);
            } catch (error) {
                setInWatchlist(false);
            }
        }
        checkWatchlist();
    }, [token, profileId, movieId])

    const handleToggleWatchlist = async () => {
        try {
            if (inWatchlist) {
                await deleteWatchlistMovie(token, profileId, movieId);
                setInWatchlist(false)
                console.log(1);
            } else {
                await createWatchlistMovie(token, profileId, movieId);
                setInWatchlist(true)
                console.log(2);
            }
        } catch (error) {
            
        }
    }

    return (
        <Button variant="link" className="text-white p-2 d-flex flex-column text-decoration-none" onClick={handleToggleWatchlist}>
            {inWatchlist ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}
            <span className="fs--1">My List</span>
        </Button>    
    );
};

export default AddWatchlistButton;
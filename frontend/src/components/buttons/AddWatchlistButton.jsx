import { React, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createWatchlistMovie, getWatchlistMovie, deleteWatchlistMovie } from "@/api/interactions";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";


const AddWatchlistButton = ({ token, profileId, movieId }) => {
    const [inWatchlist, setInWatchlist] = useState(false);
    const queryClient = useQueryClient();

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
            } else {
                await createWatchlistMovie(token, profileId, movieId);
                setInWatchlist(true)
            }
        } catch (error) {
            console.log("Toggle error: ", error)
        } finally {
            window.location.reload();
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
import React, { useState } from "react";
import { fetchWatchlist } from "../api"; 

const WatchlistButton = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [showWatchlist, setShowWatchlist] = useState(false);

    const handleShowWatchlist = async () => {
        const data = await fetchWatchlist(); // Call API function
        setWatchlist(data);
        setShowWatchlist(!showWatchlist);
    };

    return (
        <div>
            <button onClick={handleShowWatchlist}>
                {showWatchlist ? "Hide Watchlist" : "Show Watchlist"}
            </button>

            {showWatchlist && (
                <>
                    <h3>My Watchlist</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Release Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlist.length > 0 ? (
                                watchlist[0].movies.map((movie) => (
                                    <tr key={movie.id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre}</td>
                                        <td>{movie.release_date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No movies in watchlist.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default WatchlistButton;

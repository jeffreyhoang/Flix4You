import React, { useState } from "react";
import { fetchHistoryList } from "../api"; 

const HistoryButton = () => {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const handleShowHistory = async () => {
        const data = await fetchHistoryList();   // Call API function
        setHistory(data);
        setShowHistory(!showHistory);
    };

    return (
        <div>
            <button onClick={handleShowHistory}>
                {showHistory ? "Hide History" : "Show History"}
            </button>

            {showHistory && (
                <>
                    <h3>My History List</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Release Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length > 0 ? (
                                history[0].movies.map((movie) => (
                                    <tr key={movie.id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre}</td>
                                        <td>{movie.release_date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No movies in history list.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}

        </div>
    );
};
export default HistoryButton;
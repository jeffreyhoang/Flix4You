import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import MoviesButton from "../components/MoviesButton";
import UserProfilesButton from "../components/UserProfilesButton";
import WatchlistButton from "../components/WatchlistButton";
import HistoryButton from "../components/HistoryButton";
import ReviewsButton from "../components/ReviewsButton";
import SubscriptionButton from "../components/SubscriptionButton";

const Dashboard = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken"); // Logout (remove token)
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to Flix4You</h2>
            <p>You are successfully logged in!</p>

            {/* Logout Button */}
            <Button text="Logout" onClick={handleLogout} />

            {/* Display Error Messages */}
            {error && <p className="error">{error}</p>}

            {/* Buttons for New Models */}
            <MoviesButton />
            <UserProfilesButton />
            <WatchlistButton />
            <HistoryButton />
            <ReviewsButton />
            <SubscriptionButton />
        </div>
    );
};

export default Dashboard;
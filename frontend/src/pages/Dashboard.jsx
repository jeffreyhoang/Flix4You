import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fetchUserDetails } from "../api"; 
import MoviesButton from "../components/MoviesButton";
import UserProfilesButton from "../components/UserProfilesButton";
import WatchlistButton from "../components/WatchlistButton";
import HistoryButton from "../components/HistoryButton";
import ReviewsButton from "../components/ReviewsButton";
import SubscriptionButton from "../components/SubscriptionButton";
import "./styles.css";

const Dashboard = () => {
    const [username, setUsername] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        const getUserDetails = async () => {
            const userData = await fetchUserDetails();
            if (userData && userData.username) {
                setUsername(userData.username);
            }
        };

        getUserDetails();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Flix4U</h1>
                </div>
                <div className="navbar-right">
                    <span>Welcome, {username}</span>
                    <Button text="Logout" onClick={handleLogout} className="logout-button" />
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="dashboard-container">
                <h2>Welcome to Flix4U</h2>
                <MoviesButton />
                <UserProfilesButton />
                <WatchlistButton />
                <HistoryButton />
                <ReviewsButton />
                <SubscriptionButton />
            </div>
        </div>
    );
};

export default Dashboard;
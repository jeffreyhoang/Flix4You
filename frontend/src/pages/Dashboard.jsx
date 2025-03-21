import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import BackToProfilesButton from "../components/BackToProfilesButton";
import MovieList from "../components/MovieList";

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileName, setProfileName] = useState("");
    const token = localStorage.getItem("access_token");
    const storedProfile = localStorage.getItem("selected_profile");

    useEffect(() => {
        if (!token) {
            navigate("/");  // Redirect if not logged in
        } else {
            loadProfileName();
        }
    }, []);

    const loadProfileName = async () => {

        if (!storedProfile) {
            navigate("/profile-dashboard");
        } else {
            try {
                const profile = JSON.parse(storedProfile);
                setProfileName(profile.name);
                navigate("/dashboard");
            } catch (error){
                console.error("Error parsing profile:", error);
                navigate("/profile-dashboard");
            }
        }
    }

    return (
        <div>
            {/* Navbar (Might make into component) */}
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Flix4U</h1>
                </div>
                <div className="navbar-right">
                    <span className="welcome-text">Welcome, {profileName}</span>

                    <BackToProfilesButton text={"SELECT PROFILE"}/>

                    <LogoutButton/>

                </div>
            </nav>

            <div className="dashboard-container">
                <MovieList />
            </div>
        </div>
    );
};

export default Dashboard;
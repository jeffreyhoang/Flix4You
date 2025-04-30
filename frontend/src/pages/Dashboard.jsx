import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "@/components/movies/MovieList";
import NavBar from "@/components/NavBar";
import Container from "react-bootstrap/esm/Container";

const Dashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const token = localStorage.getItem("access_token");
    const storedProfile = localStorage.getItem("selected_profile");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            loadProfile();
        }
    }, []);

    const loadProfile = () => {
        if (!storedProfile) {
            navigate("/profile-dashboard");
        } else {
            try {
                const parsedProfile = JSON.parse(storedProfile);
                setProfile(parsedProfile);
            } catch (error) {
                console.error("Error parsing profile:", error);
                navigate("/profile-dashboard");
            }
        }
    };

    return (
        <Container className="dashboard-container text-center">
            <NavBar profile={profile} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <MovieList searchTerm={searchTerm} />
        </Container>
    );
};

export default Dashboard;

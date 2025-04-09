import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "@/components/movies/MovieList";
import NavBar from "@/components/NavBar";
import Container from "react-bootstrap/esm/Container";

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
        <Container className="dashboard-container text-center">
            <NavBar profileName={profileName}/>
            <MovieList />
        </Container>
    );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfiles } from "../api/profiles";
import ProfileList from "../components/profiles/ProfileList";
import CreateProfileButton from "../components/buttons/CreateProfileButton";
import EditProfilesButton from "../components/buttons/EditProfileButton";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";


const ProfileDashboard = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [isSelecting, setIsSelecting] = useState(true);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            navigate("/");  // Redirect if not logged in
        } else {
            loadProfiles();
        }
    }, []);

    const loadProfiles = async () => {
        try {
            const response = await getProfiles(token);
            setProfiles(response.data);
        } catch (error) {
            console.error("Error fetching profiles", error);
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return <p>Loading Profiles</p>
    }

    const toggleEditMode = async () => {
        setIsSelecting(!isSelecting);
    };

    return (
        <Container className="dashboard-container vh-100 text-center p-4">
            <h1 className="glow-text text-warning position-absolute top-0 start-0 mt-5 ms-5 fs-8 fw-bold">Flix4You</h1>
                <div className="dashboard-content-box">
                    <Stack className="p-4" gap={4}>
                        <h2 className="text-warning text-center fs-1 fw-bold mb-3">{isSelecting ? "Who's Watching?" : "Manage Profiles"}</h2>
                        <ProfileList profiles={profiles} isSelecting={isSelecting} />
                        <CreateProfileButton profiles={profiles} />
                        <EditProfilesButton isSelecting={isSelecting} toggleEditMode={toggleEditMode}/>
                    </Stack>
                </div>
        </Container>
    );
};

export default ProfileDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfiles } from "@/api/profiles";
import "@/styles/dashboard.css";
import ProfileList from "@/components/profiles/ProfileList";
import CreateProfileButton from "@/components/buttons/CreateProfileButton";
import EditProfilesButton from "@/components/buttons/EditProfileButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";


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
        return (
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <Spinner animation="border" variant="danger" style={{ width: '6rem', height: '6rem' }}/>
            </div>
        )
    }

    const toggleEditMode = async () => {
        setIsSelecting(!isSelecting);
    };

    return (
        <Container className="profile-dashboard-container text-center d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="glow-text text-warning position-absolute top-0 start-0 mt-4 ms-5 fs-7 fw-bold d-none d-xl-block">Flix4You</h1>
            <Row className="text-warning text-center fs-1 fw-bold mb-3">
                <h2>{isSelecting ? "Who's Watching?" : "Manage Profiles"}</h2>
            </Row>
            <Row className="mb-3">
                <ProfileList profiles={profiles} isSelecting={isSelecting} />
                <CreateProfileButton profiles={profiles}/>
            </Row>
            <Row>
                <EditProfilesButton isSelecting={isSelecting} toggleEditMode={toggleEditMode} />
            </Row>
        </Container>
    );
};

export default ProfileDashboard;
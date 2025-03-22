import React, { useState, useEffect } from "react";
import { getProfiles } from "../api/profiles";
import ProfileList from "../components/profiles/ProfileList";
import LogoutButton from "../components/buttons/LogoutButton";
import CreateProfileButton from "../components/buttons/CreateProfileButton";
import EditProfilesButton from "../components/buttons/EditProfileButton";
import { useNavigate } from "react-router-dom";

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
        <div className="dashboard-container">
            <h1 className="flix-header">Flix4You</h1>

            <h2>{isSelecting ? "Who's Watching?" : "Manage Profiles"}</h2>

            <ProfileList profiles={profiles} isSelecting={isSelecting} />
            <CreateProfileButton profiles={profiles} />
            <EditProfilesButton isSelecting={isSelecting} toggleEditMode={toggleEditMode}/>
            <LogoutButton />
        </div>
    );
};

export default ProfileDashboard;

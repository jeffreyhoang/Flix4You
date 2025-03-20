import React, { useState, useEffect } from "react";
import { getProfiles } from "../api/profiles";
import ProfileList from "../components/ProfileDashboard/ProfileList";
import LogoutButton from "../components/LogoutButton";
import CreateProfileButton from "../components/ProfileDashboard/CreateProfileButton";
import EditProfilesButton from "../components/ProfileDashboard/EditProfilesButton";
import { useNavigate } from "react-router-dom";

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [isSelecting, setIsSelecting] = useState(true);
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
        }
    };

    const toggleEditMode = async () => {
        setIsSelecting(!isSelecting);
    };

    return (
        
        <div className="profile-grid">
            <h1 className="flix-header">Flix4You</h1>

            <h2>{isSelecting ? "Select a Profile" : "Manage Profiles"}</h2>

            <div className="profiles">
                <ProfileList profiles={profiles} isSelecting={isSelecting} />
                <CreateProfileButton profiles={profiles} />
                <EditProfilesButton isSelecting={isSelecting} toggleEditMode={toggleEditMode}/>
                <LogoutButton />
            </div>
        </div>
    );
};

export default ProfileDashboard;

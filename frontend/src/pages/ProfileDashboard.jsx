import React, { useState, useEffect } from "react";
import { getProfiles } from "../api/profiles";
import ProfileList from "../components/ProfileList";
import ProfileForm from "../components/CreateProfileForm";
import { useNavigate } from "react-router-dom";

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            navigate("/login");  // Redirect if not logged in
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

    return (
        <div className="profile-container">
            <h2>Select a Profile</h2>
            <ProfileList profiles={profiles} />
            {profiles.length < 5 && <ProfileForm token={token} profiles={profiles} onProfileCreated={loadProfiles} />}
        </div>
    );
};

export default ProfileDashboard;

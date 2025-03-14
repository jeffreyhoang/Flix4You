import React, { useState, useEffect } from "react";
import { getProfiles } from "../api/profiles";
import ProfileList from "../components/ProfileList";
import LogoutButton from "../components/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
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

    return (
        
        <div className="profile-grid">
            <h1 className="flix-header">Flix4You</h1>

            <h2>Select a Profile</h2>

            <div className="profiles">
                <ProfileList profiles={profiles} />

                {profiles.length < 5 && (
                    <button
                        className="profile-button create-profile"
                        onClick={() => navigate("/create-profile")}
                    >
                        <FontAwesomeIcon icon={faPlus} className="profile-icon" />
                        <span>Create</span>
                    </button>
                )}

                <button 
                    className="profile-button logout" 
                    onClick={() => navigate("/")}>

                        <FontAwesomeIcon icon={faXmark} className="profile-icon" />

                        <span>Logout</span>
                </button>

            </div>
        </div>
    );
};

export default ProfileDashboard;

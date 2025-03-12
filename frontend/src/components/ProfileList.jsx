import React from "react";
import { selectProfile } from "../api/profiles";
import { useNavigate } from "react-router-dom";

const ProfileList = ({ profiles }) => {   // receives profiles from ProfileDashboard
    const navigate = useNavigate();

    const handleSelectProfile = (profileId) => {
        selectProfile(profileId);
        navigate("/movies"); // Redirect to Movie Dashboard
    };

    return (
        <div className="profile-list">
            {profiles.length > 0 ? (
                profiles.map((profile) => (
                    <button key={profile.id} className="profile-card" onClick={() => handleSelectProfile(profile.id)}>
                        {profile.name}
                    </button>
                ))
            ) : (
                <p>No profiles found. Create one below.</p>
            )}
        </div>
    );
};

export default ProfileList;

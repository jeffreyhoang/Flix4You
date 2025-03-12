import React, { useState } from "react";
import { createProfile } from "../api/profiles";

const CreateProfileForm = ({ token, profiles, onProfileCreated }) => {
    const [newProfileName, setNewProfileName] = useState("");
    const [error, setError] = useState("");

    const handleCreateProfile = async () => {
        if (profiles.length >= 5) {
            setError("You can only have up to 5 profiles.");
            return;
        }
        try {
            await createProfile(token, { name: newProfileName });
            setNewProfileName(""); 
            onProfileCreated();  // Refresh profile list
        } catch (error) {
            setError("Error creating profile.");
        }
    };

    return (
        <div className="new-profile">
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Enter profile name"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
            />
            <button onClick={handleCreateProfile}>Create Profile</button>
        </div>
    );
};

export default CreateProfileForm;

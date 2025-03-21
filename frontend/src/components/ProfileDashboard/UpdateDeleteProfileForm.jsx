import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../api/profiles";
import DeleteProfileButton from "./DeleteProfileButton"
import BackToProfilesButton from "../BackToProfilesButton";

const UpdateProfileForm = ({ token }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", avatar: "" })
    const [message, setMessage] = useState("");

    

    // handles input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storedProfile = JSON.parse(localStorage.getItem("selected_profile"));
        const profileId = storedProfile.id;
        console.log(1);

        try {
            await updateProfile(token, profileId, { name: formData.name, avatar: formData.avatar || null });
            setMessage("Profile updated successfully. Redirecting to profile list...")
            setTimeout(() => navigate("/profile-dashboard"), 1000);
        } catch(error) {
            setMessage("Error updating profile. Please try again.")
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Edit Profile</h2>
                {message && <p className="form-message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Profile Name" onChange={handleChange}></input>
                    <input type="text" name="avatar" placeholder="Avatar URL (optional)" onChange={handleChange}></input>
                    <button type="submit" className="form-button-1">Update</button>
                </form>
                <BackToProfilesButton text={"Cancel"}/>
                <DeleteProfileButton />
            </div>
        </div>
    );
}

export default UpdateProfileForm;
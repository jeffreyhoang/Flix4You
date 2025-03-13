import React, { useState } from "react";
import { createProfile } from "../api/profiles";
import { useNavigate } from "react-router-dom";

const CreateProfileForm = ({ token }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", avatar: "" })
    const [message, setMessage] = useState("");

    // handles input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProfile(token, { name: formData.name, avatar: formData.avatar || null});
            setMessage("Profile created successfully! Redirecting to profile list...")
            setTimeout(() => navigate("/profile-dashboard"), 2000);
        } catch (error) {
            setMessage("Error creating profile. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Create Profile</h2>
                {message && <p className="error">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Profile Name" onChange={handleChange} required />
                    <input type="text" name="avatar" placeholder="Avatar URL (optional)" onChange={handleChange} />
                    <button type="submit" className="login-button">Create Profile</button>
                </form>
            </div>
        </div>
    )
};

export default CreateProfileForm
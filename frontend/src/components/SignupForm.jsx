import React, { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    // handles input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            setMessage("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setMessage("Signup failed. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Sign Up</h2>
                {message && <p className="error">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
                    <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" className="form-button-1">Sign Up</button>
                </form>
                <button className="form-button-2" onClick={() => navigate("/")}>Already have an account? Login</button>
            </div>
        </div>
    );
};

export default SignupForm;

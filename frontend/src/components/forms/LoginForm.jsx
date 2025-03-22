import React, { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);

            // Store access & refresh tokens in localStorage
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            setMessage("Login successful! Redirecting...");
            setTimeout(() => navigate("/profile-dashboard"), 2000);
        } catch (error) {
            setMessage("Invalid username or password.");
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Login</h2>
                {message && <p className="form-message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" className="form-button-1">Login</button>
                </form>
                <button className="form-button-2" onClick={() => navigate("/signup")}>Don't have an account? Sign Up</button>
            </div>
        </div>
    );
};

export default LoginForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "./styles.css"; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("https://flix4youbackend.onrender.com/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),  
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            alert("Login successful!");
            navigate("/dashboard");
        } else {
            alert(`Login failed: ${data.detail || "Invalid credentials"}`);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login to Flix4U</h2>
                <form onSubmit={handleLogin}>
                    <InputField label="Username " type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <InputField label="Password  " type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button text="Login" type="submit" className="login-button" />
                </form>
                <p>Don't have an account?  
                    <Button text="Sign Up" onClick={() => navigate("/signup")} className="signup-button" />
                </p>
            </div>
        </div>
    );
};

export default Login;

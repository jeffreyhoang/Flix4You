import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "./styles.css"; 

const local = "http://127.0.0.1:8000/api/signup/"
const global = "https://flix4u-production.up.railway.app/api/signup/"; // Change to signup endpoint


const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch(global, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }), // Send both username & email
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful!");
            navigate("/"); // Redirect to login
        } else {
            alert(`Signup failed: ${data.detail || "Error registering"}`);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

            <h2>Signup</h2>
            
            <form onSubmit={handleSignup}>
                <InputField label="Username " type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <InputField label="Email " type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label="Password " type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button text="Sign Up" onClick={handleSignup} />
            </form>
            
            <p>Already have an account?  
                <Button text="Login" onClick={() => navigate("/")} />
            </p>
            </div>
        </div>
    );
};

export default Signup;

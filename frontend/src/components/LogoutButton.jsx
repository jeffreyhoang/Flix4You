import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            const refreshToken = localStorage.getItem["refresh_token"];

            if (refreshToken) {
                await logout(refreshToken);
            }

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/");
        } catch (error) {
            console.log("Logout failed.");
            navigate("/");
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
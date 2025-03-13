import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import BackToProfilesButton from "../components/BackToProfilesButton";
import "../styles/styles.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [profileName, setProfileName] = useState("");

    useEffect(() => {
        const storedProfile = localStorage.getItem("selected_profile");

        if (!storedProfile) {
            navigate("/profile-dashboard");
        } else {
            try {
                const profile = JSON.parse(storedProfile);
                setProfileName(profile.name);
                console.log(profile.name)
                navigate("/dashboard");
            } catch (error){
                console.error("Error parsing profile:", error);
                navigate("/profile-dashboard");
            }
        }
    }, []);

    return (
        <div>
            {/* Navbar (Might make into component) */}
            <nav className="navbar">
                <div className="navbar-left">
                    <h1>Flix4U</h1>
                </div>
                <div className="navbar-right">
                    <span>Welcome, {profileName}</span>
                    <LogoutButton />
                    <BackToProfilesButton text={"Select Profile"}/>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;
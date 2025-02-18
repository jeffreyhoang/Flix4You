import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <h2>Welcome to Flix4You</h2>
            <p>You are successfully logged in!</p>
            <Button text="Logout" onClick={handleLogout} />
        </div>
    );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Dashboard = () => {
    const [users, setUsers] = useState([]); // Store users
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("accessToken"); // Get JWT token
            if (!token) {
                setError("User not authenticated.");
                return;
            }

            try {
                const response = await fetch("https://flix4youbackend.onrender.com/api/users/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // ✅ Include JWT token
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch users.");
                }

                const data = await response.json();
                setUsers(data); // ✅ Store users in state
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken"); // ✅ Logout (remove token)
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to Flix4You</h2>
            <p>You are successfully logged in!</p>

            <Button text="Logout" onClick={handleLogout} />

            {error && <p className="error">{error}</p>}

            <h3>Registered Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfileDashboard from "./pages/ProfileDashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile-dashboard" element={<ProfileDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;

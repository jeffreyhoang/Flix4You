import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "../src/styles/styles.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfileDashboard from "./pages/ProfileDashboard";
import CreateProfilePage from "./pages/CreateProfilePage";
import Dashboard from "./pages/Dashboard";
import UpdateDeleteProfilePage from "./pages/UpdateDeleteProfilePage";
import DisplayMoviePage from "./pages/DisplayMoviePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile-dashboard" element={<ProfileDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-profile" element={<CreateProfilePage />} />
                <Route path="/update-delete-profile" element={<UpdateDeleteProfilePage />} />
                <Route path="/display-movie" element={<DisplayMoviePage />} />
            </Routes>
        </Router>
    );
}

export default App;

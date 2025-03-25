import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/styles/globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfileDashboard from "./pages/ProfileDashboard";
import CreateProfilePage from "./pages/CreateProfilePage";
import Dashboard from "./pages/Dashboard";
import UpdateDeleteProfilePage from "./pages/UpdateDeleteProfilePage";
import DisplayMoviePage from "./pages/MoviePreviewPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
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

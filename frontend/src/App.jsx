import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import "@/styles/buttons.css";
import "@/styles/forms.css";
import "@/styles/dashboard.css";
import "@/styles/profileDashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import ProfileDashboard from "@/pages/ProfileDashboard";
import CreateProfilePage from "@/pages/CreateProfilePage";
import Dashboard from "@/pages/Dashboard";
import UpdateDeleteProfilePage from "@/pages/UpdateDeleteProfilePage";
import DisplayMoviePage from "@/pages/MoviePreviewPage";
import CommentPage from '@/pages/CommentPage';

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
                <Route path="/comment" element={<CommentPage />} />
            </Routes>
        </Router>
    );
}

export default App;

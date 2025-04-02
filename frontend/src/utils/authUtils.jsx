import { logout } from "@/api/auth";

export const handleLogout = async (navigate) => {
    const refreshToken = localStorage.getItem("refresh_token");

    try {
        if (refreshToken) {
            console.log(1);
            await logout(refreshToken);
        }
    } catch (error) {
        console.log(2);
        console.warn("Logout API call failed:", error.message);
    } finally {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
    }
};



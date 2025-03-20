import React, { useEffect } from "react";
import DeleteProfileButton from "../components/ProfileDashboard/DeleteProfileButton";
import UpdateProfileForm from "../components/ProfileDashboard/UpdateProfileForm";
import BackToProfilesButton from "../components/BackToProfilesButton";
import { useNavigate } from "react-router-dom";

const UpdateDeleteProfilePage = () => {
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate("/");
        }
    }, [token]);

    return  (
        <div>
            <UpdateProfileForm token={token}/>
            <BackToProfilesButton text={"Cancel"}/>
            <DeleteProfileButton />
        </div>
    )
}

export default UpdateDeleteProfilePage
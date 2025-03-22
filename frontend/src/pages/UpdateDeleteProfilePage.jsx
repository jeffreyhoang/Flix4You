import React, { useEffect } from "react";
import UpdateProfileForm from "../components/forms/UpdateDeleteProfileForm";
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
        </div>
    )
}

export default UpdateDeleteProfilePage
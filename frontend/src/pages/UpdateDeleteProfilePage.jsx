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
            <h1 className="glow-text text-warning position-absolute top-0 start-0 mt-4 ms-5 fs-8 fw-bold">Flix4You</h1>
            <UpdateProfileForm token={token}/>
        </div>
    )
}

export default UpdateDeleteProfilePage
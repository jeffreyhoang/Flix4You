import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../api/profiles";
import DeleteProfileButton from "../buttons/DeleteProfileButton"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";


const UpdateProfileForm = ({ token }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", avatar: "" })
    const [message, setMessage] = useState("");

    // handles input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storedProfile = JSON.parse(localStorage.getItem("selected_profile"));
        const profileId = storedProfile.id;
        console.log(1);

        try {
            await updateProfile(token, profileId, { name: formData.name, avatar: formData.avatar || null });
            setMessage("Profile updated successfully. Redirecting to profile list...")
            setTimeout(() => navigate("/profile-dashboard"), 1000);
        } catch(error) {
            setMessage("Error updating profile. Please try again.")
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={10} md={8} xl={5}>
                    <div className="form-box p-4 rounded shadow text-center">
                        <h2 className="text-warning text-center fs-1 fw-bold mb-3">Edit Profile</h2>
                        {message && <p className="form-message text-center fs-5">{message}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Stack gap={3}>
                                <Form.Control 
                                    className="form-input-box text-white" 
                                    size="lg" 
                                    type="text" 
                                    name="name" 
                                    placeholder="Profile Name"
                                    onChange={handleChange}
                                />
                                <Form.Control 
                                    className="form-input-box text-white" 
                                    size="lg" 
                                    type="text" 
                                    name="avatar" 
                                    placeholder="Avatar URL (optional)"
                                    onChange={handleChange}
                                />
                                <Button className="custom-gradient-btn-1 w-100 mt-4 p-2" size="lg" type="submit" >Update</Button>
                            </Stack>
                        </Form>
                        <Stack className="mt-3"gap={3}>
                            <Button className="custom-gradient-btn-2 w-100" size="lg" onClick={() => navigate("/profile-dashboard")}>Back</Button>
                            <DeleteProfileButton />
                        </Stack>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateProfileForm;
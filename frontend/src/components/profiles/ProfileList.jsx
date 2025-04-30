import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";



const ProfileList = ({ profiles, isSelecting }) => {   // Receives profiles from ProfileDashboard
    const navigate = useNavigate();

    // Handles when the user selects a profile
    const handleSelectProfile = (profile) => {
        if(isSelecting) {
            localStorage.setItem("selected_profile", JSON.stringify(profile));
            navigate("/dashboard"); // Redirect to profile Dashboard
        } else {
            localStorage.setItem("selected_profile", JSON.stringify(profile));
            navigate("/update-delete-profile");
        }
    };

    return (
        <Container>
            {profiles.length > 0 ? (
                <Row className="justify-content-center">
                    {profiles.map((profile) => (
                        <Col className="d-flex flex-column align-items-center mb-4" key={profile.id}>
                            <Button 
                            className="create-profile-btn rounded-circle mb-2 d-flex align-items-center justify-content-center overflow-hidden p-0 border-0"
                            onClick={() => handleSelectProfile(profile)}
                            style={{ width: "8rem", height: "8rem", backgroundColor: "transparent" }}
                            >
                            {isSelecting ? (
                                profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt={`${profile.name}'s avatar`}
                                    className="rounded-circle"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                ) : (
                                <FontAwesomeIcon icon={faCircleUser} className="profile-icon" style={{ fontSize: "7.8rem" }} />
                                )
                            ) : (
                                <FontAwesomeIcon icon={faPencil} className="profile-icon" style={{ fontSize: "3rem" }} />
                            )}
                            </Button>
                            <p>{profile.name}</p>
                        </Col>
                    ))}
                </Row>
            ) : (
            <p>No profiles found. Create one below.</p>)}
        </Container>
    );
};

export default ProfileList;
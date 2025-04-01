import React, { useState } from "react";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    // handles input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            setMessage("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setMessage("Signup failed. Please try again.");
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={10} md={8} xl={5}>
                    <div className="form-box p-4 rounded shadow">
                        <h2 className="text-warning text-center fs-1 fw-bold mb-3">Sign Up</h2>
                        {message && <p className="form-message text-center fs-5">{message}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Stack gap={3}>
                                <Form.Control 
                                    className="form-input-box text-white" 
                                    size="md" 
                                    type="text" 
                                    name="first_name" 
                                    placeholder="First Name" 
                                    onChange={handleChange} 
                                />
                                <Form.Control 
                                    className="form-input-box text-white" 
                                    size="md" 
                                    type="text" 
                                    name="last_name" 
                                    placeholder="Last Name" 
                                    onChange={handleChange} 
                                />
                                <Form.Control 
                                    className="form-input-box text-white" 
                                    size="md" 
                                    type="text" 
                                    name="username" 
                                    placeholder="Username" 
                                    onChange={handleChange} 
                                />
                                <Form.Control 
                                    className="form-input-box text-white" 
                                    size="md" 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email" 
                                    onChange={handleChange} 
                                />
                                <Form.Control 
                                    className="form-input-box text-white" 
                                    size="md" 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    onChange={handleChange} 
                                />
                                <Button className="custom-gradient-btn-1 w-100 mt-3 p-2" size="md" type="submit">Sign Up</Button>
                            </Stack>
                        </Form>
                        <Button className="custom-gradient-btn-2 w-100 mt-3" size="md" onClick={() => navigate("/")}>Already have an account? Login</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupForm;

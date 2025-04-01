import React, { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const LoginForm = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);

            // Store access & refresh tokens in localStorage
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            setMessage("Login successful! Redirecting...");
            setTimeout(() => navigate("/profile-dashboard"), 2000);
        } catch (error) {
            setMessage("Invalid username or password.");
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={10} md={8} xl={5}>
                    <div className="form-box p-4 rounded shadow">
                        <h2 className="text-warning text-center fs-1 fw-bold">Login</h2>
                        {message && <p className="form-message text-center fs-5">{message}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Stack gap={3}>
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
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                                <Button className="custom-gradient-btn-1 w-100 mt-3 p-2" size="md" type="submit">Login</Button>
                            </Stack>
                        </Form>
                        <Button className="custom-gradient-btn-2 w-100 mt-3" size="md" onClick={() => navigate("/Signup")}>Don't have an account? Sign up</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;

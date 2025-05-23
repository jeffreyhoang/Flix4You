import { useNavigate } from "react-router-dom";
import { handleLogout } from "@/utils/authUtils.jsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = ({ profile, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <Navbar className="bg-black" fixed="top">
            <Container>
            <Navbar.Text className="text-white fw-bold d-flex align-items-center gap-2">
                {profile?.avatar ? (
                    <img
                        src={profile.avatar}
                        alt="Profile Avatar"
                        className="rounded-circle"
                        style={{ width: "35px", height: "35px", objectFit: "cover" }}
                    />
                ) : (
                    <FontAwesomeIcon icon={faCircleUser} className="text-white" style={{ fontSize: "1.8rem" }} />
                )}
                For {profile?.name}
            </Navbar.Text>
            
                <Nav className="align-items-center">
                    {/* Search Icon */}
                    <Nav.Link className="text-white" onClick={() => setShowSearch(!showSearch)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Nav.Link>

                    {/* Search Input Box */}
                    {showSearch && (
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control ms-2"
                            style={{ width: "200px" }}
                        />
                    )}

                    {/* Menu Dropdown */}
                    <NavDropdown
                        align="end"
                        title={<FontAwesomeIcon icon={faBars} className="text-white" />}
                        menuVariant="dark"
                    >
                        <NavDropdown.Item onClick={() => navigate("/profile-dashboard")}>Manage Profiles</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => handleLogout(navigate)}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
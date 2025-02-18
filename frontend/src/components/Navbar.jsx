import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/signup"></Link></li>
                <li><Link to="/login"></Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import logo from '../img/logo.png';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="container-fluid d-flex align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="RentCar Logo" className="logo" />
          <ul className="nav-links d-flex flex-wrap">
            <li><Link to="/">Homepage</Link></li>
            <li><Link to="/cars">Cars</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            {user && user.role === "admin" && (
              <li><Link to="/admin">Admin Page</Link></li>
            )}
            {user && (
              <li><Link to="/myrentals">My Rentals</Link></li>
            )}
            {user && user.role === "admin" && (
              <li><Link to="/users">User Management</Link></li>
            )}
          </ul>
        </div>

        <div className="header-btn mt-2 mt-lg-0">
          {user ? (
            <>
              <span>Hello, {user.username}</span>
              <button onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

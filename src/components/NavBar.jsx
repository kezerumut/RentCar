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
      <nav>
        <img src={logo} alt="RentCar Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {user && user.role === "admin" && (
          <li><Link to="/admin">admin</Link></li>
           )}
          {user && (
          <li><Link to="/myrentals">My Rentals</Link></li>
           )}
{user && user.role === "admin" && (
          <li><Link to="/users">Kullanıcı Yönetimi</Link></li>
           )}
        </ul>
      </nav>

      <div className="header-btn">
        {user ? (
          <>
            <span>Merhaba, {user.username}</span>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </>
        ) : (
          <>
            <div className="header-btn">
                     <Link to="/login" className="btn">Login</Link>
                     <Link to="/register" className="btn">Register</Link>
                   </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;

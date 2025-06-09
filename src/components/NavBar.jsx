import { Link, useNavigate } from "react-router-dom";
import logo from '../img/logo.png'; 

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/"); // anasayfaya yönlendir
  };

  return (
    <header className="header">
      <nav>
        <img src={logo} alt="RentCar Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/admin">admin</Link></li>
          <li><Link to="/myrentals">My Rentals</Link></li>
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

import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link as ScrollLink } from "react-scroll";


function Navbar({ user }) {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Homepage</Link></li>
        </ul>
      </nav>
       <nav>
        <ul className="nav-links">
          <li><Link to="/cart">Sepet</Link></li>
        </ul>
      </nav>

      <div className="header-btn">
        {user ? (
          <span>Merhaba, {user.name}</span>
        ) : (
          <>
            <Link to="/login">Giriş Yap</Link>
            <Link to="/register">Kayıt Ol</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;

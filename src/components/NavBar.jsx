import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/"); // anasayfaya yönlendir
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/cars">Cars</Link></li>
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
            <Link to="/login">Giriş Yap</Link>
            <Link to="/register">Kayıt Ol</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;

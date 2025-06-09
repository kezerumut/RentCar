import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Giriş denemesi:", username, password);

    const res = await fetch("http://localhost/rentcar-api/login.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password }),
  credentials: "include", // CORS için önemli
})

    const data = await res.json();
    console.log("API'den gelen:", data);

    if (data.success) {
      // ✅ id'yi de ekliyoruz!
      const user = {
        id: data.id,
        username: data.username,
        role: data.role
      };

      setUser(user);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}

export default Login;

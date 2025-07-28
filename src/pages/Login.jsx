import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter your username and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost/rentcar-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();
      console.log("API'den gelen:", data);

      if (data.success) {
        const user = {
          id: data.id,
          username: data.username,
          role: data.role
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        navigate(user.role === "admin" ? "/admin" : "/");
      } else {
        alert(data.message || "Log in Failed.");
      }
    } catch (err) {
      console.error("Log in Failed:", err);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log in</button>
        <p>
          Don't you a account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password || !confirmPassword) {
      setMessage("Lütfen tüm alanları doldurun.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }

    fetch("http://localhost/rentcar-api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Kayıt başarılı! Giriş yapabilirsiniz.");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        } else {
          setMessage(data.message || "Kayıt başarısız.");
        }
      })
      .catch((err) => {
        console.error("Kayıt hatası:", err);
        setMessage("Bir hata oluştu.");
      });
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Şifreyi Tekrar Girin"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Kayıt Ol</button>
      </form>
      {message && <p className="register-message">{message}</p>}
    </div>
  );
}

export default Register;

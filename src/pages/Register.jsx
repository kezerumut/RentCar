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
      setMessage("Please fill in all fields.");
      return;}
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;}
    fetch("http://localhost/rentcar-api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),})
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Registration successful! You can log in.");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        } else {
          setMessage(data.message || "Registration failed.");}})
      .catch((err) => {
        console.error("Registration error:", err);
        setMessage("An error occurred.");});};

  return (
    <div className="register-container">
      <h2>Register      </h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {message && <p className="register-message">{message}</p>}
    </div>
  );
}

export default Register;

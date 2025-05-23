import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Navbar from "./components/Navbar";
import CarsPage from './pages/CarsPage';
import CarDetailPage from "./pages/CarDetailPage";
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [cars, setCars] = useState([]);
  const [cart, setCart] = useState([]);

  // ✅ API'den araçları al
  useEffect(() => {
    fetch("http://localhost/rentcar-api/getCars.php")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Araçlar alınamadı:", err));
  }, []);

 const addToCart = (car) => {
  fetch("http://localhost/rentcar-api/addToCart.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(car)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Sunucudan yanıt:", data);
      if (data.success) {
        setCart(prev => [...prev, car]); // Local state'e de ekle
      }
    })
    .catch(err => console.error("Sepet gönderilemedi:", err));
};

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} cars={cars} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cars" element={<CarsPage cars={cars} addToCart={addToCart} />} />
        <Route path="/car/:id" element={<CarDetailPage cars={cars} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;

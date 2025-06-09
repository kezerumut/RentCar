import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Navbar from "./components/NavBar";
import CarsPage from './pages/CarsPage';
import CarDetailPage from "./pages/CarDetailPage";
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import AdminRentals from './pages/AdminRentals';
import MyRentalsPage from './pages/MyRentalsPage';

function App() {
  const [cars, setCars] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  

  // ✅ Araçları API'den çek
  useEffect(() => {
    fetch("http://localhost/rentcar-api/getCars.php")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Araçlar alınamadı:", err));
  }, []);

 const addToCart = (car, user) => {
  console.log("car:", car); // 👈 kontrol

  if (!user || !user.id) {
    alert("Giriş yapmadan sepete ekleyemezsiniz.");
    return;
  }

  if (!car.id) {
    alert("Araç bilgisi eksik (ID bulunamadı).");
    return;
  }

  const cartItem = {
    id: car.id,
    name: car.name,
    price: car.price,
    year: car.year,
    image: car.image,
    user_id: user.id
  };

  console.log("Gönderilen cartItem:", cartItem);

  fetch("http://localhost/rentcar-api/addToCart.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartItem)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Sunucudan gelen:", data);
      if (data.success) {
        alert("Sepete eklendi");
        setCart(prev => [...prev, cartItem]);
      } else {
        alert("Hata: " + data.message);
      }
    })
    .catch(err => {
      console.error("Sepet gönderilemedi:", err);
    });
     console.log("cartItem:", cartItem);
console.log("car:", car);

};


  return (
    
    <Router>
      
     <Navbar user={user} setUser={setUser} />
      <Routes>
        
        <Route path="/" element={<HomePage addToCart={addToCart} cars={cars} />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cars" element={<CarsPage cars={cars} addToCart={addToCart} user={user} />} />
        <Route path="/car/:id" element={<CarDetailPage cars={cars} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} user={user} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/rentals" element={<AdminRentals />} />
        <Route path="/myrentals" element={<MyRentalsPage />} />
 

      </Routes>
    </Router>
    
  );
}

export default App;

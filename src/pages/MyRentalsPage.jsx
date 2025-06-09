import React, { useEffect, useState } from 'react';
import './MyRentalsPage.css';

function MyRentalsPage({ user }) {
  const [rentals, setRentals] = useState([]);

 useEffect(() => {
  const user_id = localStorage.getItem("user_id");

  fetch("http://localhost/rentcar-api/getRentals.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setRentals(data.data);
      } else {
        console.error("Veri alınamadı");
      }
    })
    .catch((err) => console.error(err));
}, [user]);

  return (
    <div className="orders-container">
      <br /><br /><br /><br />
      <h2>Kiraladıklarım</h2>
      <br />
      {rentals.length === 0 ? (
        <p>Henüz bir kiralama yapmadınız.</p>
      ) : (
        rentals.map((rental, i) => (
          <div key={i} className="order-card">
            <img
              src={`http://localhost/rentcar-api/uploads/${rental.image}`}
              alt={rental.car_name}
              className="order-image"
            />
            <div>
              <h3>{rental.car_name}</h3>
              <p>Fiyat: {rental.price} ₺ / gün</p>
              <p>Adres: {rental.adres}</p>
              <p>Tarih: {rental.tarih}</p>
              <p>Saat: {rental.saat}</p>
              <p>Kiralama Zamanı: {rental.created_at}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRentalsPage;

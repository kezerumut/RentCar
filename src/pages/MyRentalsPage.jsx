import React, { useEffect, useState } from 'react';
import './MyRentalsPage.css';

function MyRentalsPage({ user }) {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    if (!user || !user.id) return;

    fetch("http://localhost/rentcar-api/getRentals.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: user?.id })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          setRentals(data.data);
        } else {
          console.error("Veri alınamadı:", data.message);
        }
      })
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">Kiraladıklarım</h2>
      {rentals.length === 0 ? (
        <p className="empty-message">Henüz bir kiralama yapmadınız.</p>
      ) : (
        <div className="orders-grid">
          {rentals.map((rental, i) => (
            <div key={i} className="order-card">
              <img
                src={`http://localhost/rentcar-api/images/${rental.image}`}
                alt={rental.car_name}
                className="order-image"
              />
              <div className="order-details">
                <h3>{rental.car_name}</h3>
                <p><strong>Fiyat:</strong> {rental.price} ₺ / gün</p>
                <p><strong>Adres:</strong> {rental.adres}</p>
                <p><strong>Tarih:</strong> {rental.tarih}</p>
                <p><strong>Saat:</strong> {rental.saat}</p>
                <p><strong>Kiralama Zamanı:</strong> {rental.created_at}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRentalsPage;

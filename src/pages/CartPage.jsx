import React, { useEffect, useState } from 'react';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [details, setDetails] = useState({});

  // ✅ Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    fetch("http://localhost/rentcar-api/getCart.php")
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error("Sepet verisi alınamadı:", err));
  }, []);

  const handleChange = (e, id, field) => {
    setDetails({
      ...details,
      [id]: {
        ...details[id],
        [field]: e.target.value,
      },
    });
  };

  return (
    <div className="cart-container">
      <h2>Sepetim</h2>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        cartItems.map((car) => (
          <div key={car.id} className="cart-item">
            <h3>{car.car_name}</h3>
            <p>{car.price} ₺ / gün</p>
            <label>Adres:</label>
            <input type="text" onChange={(e) => handleChange(e, car.id, 'adres')} />
            <label>Tarih:</label>
            <input type="date" onChange={(e) => handleChange(e, car.id, 'tarih')} />
            <label>Saat:</label>
            <input type="time" onChange={(e) => handleChange(e, car.id, 'saat')} />
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <button className="kirala-button" onClick={() => console.log(details)}>
          Kirala
        </button>
      )}
    </div>
  );
}

export default CartPage;

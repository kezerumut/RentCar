import React, { useEffect, useState } from 'react';
import './CartPage.css';

function CartPage({ cart, user }) {
  const [cartItems, setCartItems] = useState([]);
  const [details, setDetails] = useState({});

 useEffect(() => {
  if (user && user.id) {
    fetch("http://localhost/rentcar-api/getCart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: user.id })
    })
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error("Sepet verisi alınamadı:", err));
  }
}, [user]);


  const handleChange = (e, id, field) => {
    setDetails({
      ...details,
      [id]: {
        ...details[id],
        [field]: e.target.value,
      },
    });
  };

  const handleRemove = (id) => {
    fetch("http://localhost/rentcar-api/removeFromCart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })  // sadece cart tablosundaki satır id'si
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCartItems(prev => prev.filter(item => item.id !== id));
        } else {
          alert("Silme işlemi başarısız: " + data.message);
        }
      })
      .catch(err => console.error("Silme hatası:", err));
  };

  const handleRent = () => {
    const dataToSend = cartItems.map(car => ({
      id: car.id,
      car_name: car.car_name,
      price: car.price,
      year: car.year,
      image: car.image,
      adres: details[car.id]?.adres || "",
      tarih: details[car.id]?.tarih || "",
      saat: details[car.id]?.saat || "",
      user_id: user?.id || null
    }));

    fetch("http://localhost/rentcar-api/rentCar.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Kiralama işlemi başarıyla gerçekleşti.");
          fetch("http://localhost/rentcar-api/clearCart.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: user?.id })
          })
            .then(res => res.json())
            .then(resp => {
              if (resp.success) {
                setCartItems([]);
              }
            });
        } else {
          alert("Hata: " + data.message);
        }
      })
      .catch(err => {
        console.error("Sunucu hatası:", err);
        alert("Sunucu hatası meydana geldi.");
      });
  };

  return (
    <div className="cart-container">
      <br /><br /><br /><br />
      <h2>Sepetim</h2>
      <br /><br />
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        cartItems.map((car) => (
          <div key={car.id} className="cart-item">
            <img
  src={`http://localhost/rentcar-api/images/${car.image}`}
  alt={car.car_name}
  className="cart-image"
/>
            <h3>{car.car_name}</h3>
            <p>{car.price} ₺ / gün</p>

            <label>Adres:</label>
            <input
              type="text"
              value={details[car.id]?.adres || ''}
              onChange={(e) => handleChange(e, car.id, 'adres')}
            />
            <label>Tarih:</label>
            <input
              type="date"
              value={details[car.id]?.tarih || ''}
              onChange={(e) => handleChange(e, car.id, 'tarih')}
            />
            <label>Saat:</label>
            <input
              type="time"
              value={details[car.id]?.saat || ''}
              onChange={(e) => handleChange(e, car.id, 'saat')}
            />

            <button className="remove-button" onClick={() => handleRemove(car.id)}>
              Sepetten Çıkar
            </button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <button className="kirala-button" onClick={handleRent}>
          Kirala
        </button>
      )}
    </div>
  );
}

export default CartPage;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

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
        .then(data => {
      
          setCartItems(Array.isArray(data) ? data : []);
        })
        .catch(err => {
          console.error("Sepet verisi alınamadı:", err);
          setCartItems([]);
        });
    } else {
      setCartItems([]);
    }
  }, [user]);


  const handleChange = (e, id, field) => {
    setDetails(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: e.target.value,
      },
    }));
  };


  const handleRemove = (id) => {
    fetch("http://localhost/rentcar-api/removeFromCart.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id }) 
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCartItems(prev => prev.filter(item => item.id !== id));
      
          setDetails(prev => {
            const nxt = { ...prev };
            delete nxt[id];
            return nxt;
          });
        } else {
          alert("Silme işlemi başarısız: " + (data.message || ""));
        }
      })
      .catch(err => {
        console.error("Silme hatası:", err);
        alert("Silme işlemi sırasında bir hata oluştu.");
      });
  };

  const handleRent = () => {

    for (const car of cartItems) {
      const det = details[car.id] || {};
      if (!det.adres || !det.tarih || !det.saat) {
        alert(`Lütfen "${car.car_name}" için adres, tarih ve saat bilgilerini eksiksiz girin.`);
        return;
      }
    }

    const dataToSend = cartItems.map(car => ({
      id: car.id,
      car_name: car.car_name,
      price: car.price,
      year: car.year,
      image: car.image,
      adres: details[car.id].adres,
      tarih: details[car.id].tarih,
      saat: details[car.id].saat,
      user_id: user.id
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
            body: JSON.stringify({ user_id: user.id })
          })
            .then(res => res.json())
            .then(resp => {
              if (resp.success) {
                setCartItems([]);
                setDetails({});
              }
            })
            .catch(err => console.error("Sepet temizleme hatası:", err));
        } else {
          alert("Hata: " + (data.message || ""));
        }
      })
      .catch(err => {
        console.error("Sunucu hatası:", err);
        alert("Sunucu hatası meydana geldi.");
      });
  };

  if (!user) {
    return (
      <div className="cart-container">
        <h2>Sepetim</h2>
        <p>Sepet görüntülemek için giriş yapmalısınız.</p>
        <div className="cart-action-links">
          <Link to="/login" className="btn-link">Giriş Yap</Link>
          <span> veya </span>
          <Link to="/register" className="btn-link">Kayıt Ol</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Sepetim</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Sepetinizde henüz araç yok.</p>
          <button className="btn-primary" onClick={() => navigate('/cars')}>
            Araçlara Göz At
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((car) => (
              <div key={car.id} className="cart-item">
                <img
                  src={`http://localhost/rentcar-api/images/${car.image}`}
                  alt={car.car_name}
                  className="cart-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{car.car_name}</h3>
                  <p className="cart-item-price">{car.price} ₺ / gün</p>

                  <div className="field-group">
                    <label htmlFor={`adres-${car.id}`}>Adres:</label>
                    <input
                      id={`adres-${car.id}`}
                      type="text"
                      placeholder="Alınacak adres"
                      value={details[car.id]?.adres || ''}
                      onChange={(e) => handleChange(e, car.id, 'adres')}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor={`tarih-${car.id}`}>Tarih:</label>
                    <input
                      id={`tarih-${car.id}`}
                      type="date"
                      value={details[car.id]?.tarih || ''}
                      onChange={(e) => handleChange(e, car.id, 'tarih')}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor={`saat-${car.id}`}>Saat:</label>
                    <input
                      id={`saat-${car.id}`}
                      type="time"
                      value={details[car.id]?.saat || ''}
                      onChange={(e) => handleChange(e, car.id, 'saat')}
                    />
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() => handleRemove(car.id)}
                  >
                    Sepetten Çıkar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <button className="btn-primary kirala-button" onClick={handleRent}>
              Kirala
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;

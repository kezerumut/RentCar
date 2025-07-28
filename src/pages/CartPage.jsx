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
          console.error("Cart data could not be retrieved:", err);
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
          alert("Deletion failed: " + (data.message || ""));
        }
      })
      .catch(err => {
        console.error("Deletion Error:", err);
        alert("An error occurred during the deletion process.");
      });
  };

  const handleRent = () => {
    for (const car of cartItems) {
      const det = details[car.id] || {};
      if (!det.adres || !det.tarih || !det.saat) {
        alert(`Please "${car.car_name}" Please enter the address, date and time information completely.`);
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
        "Content-Type": "application/json"     },
      body: JSON.stringify(dataToSend)   })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("The rental transaction was completed successfully.");
      
          fetch("http://localhost/rentcar-api/clearCart.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"            },
            body: JSON.stringify({ user_id: user.id })          })
            .then(res => res.json())
            .then(resp => {
              if (resp.success) {
                setCartItems([]);
                setDetails({});              } })
            .catch(err => console.error("Cart clear error:", err));
        } else {
          alert("Hata: " + (data.message || ""));        }      })
      .catch(err => {
        console.error("Server error:", err);
        alert("A server error occurred.");
      });
  };

  if (!user) {
    return (
      <div className="cart-container">
        <h2>My Cart</h2>
        <p>You must be logged in to view your cart.</p>
        <div className="cart-action-links">
          <Link to="/login" className="btn-link">Log in</Link>
          <span> or </span>
          <Link to="/register" className="btn-link">Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>There are no vehicles in your cart yet.</p>
          <button className="btn-primary" onClick={() => navigate('/cars')}>
            Browse Vehicles
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
                  <p className="cart-item-price">{car.price} $ / day</p>

                  <div className="field-group">
                    <label htmlFor={`adres-${car.id}`}>Adress:</label>
                    <input
                      id={`adres-${car.id}`}
                      type="text"
                      placeholder="Alınacak adres"
                      value={details[car.id]?.adres || ''}
                      onChange={(e) => handleChange(e, car.id, 'adres')}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor={`tarih-${car.id}`}>Rental Date:</label>
                    <input
                      id={`tarih-${car.id}`}
                      type="date"
                      value={details[car.id]?.tarih || ''}
                      onChange={(e) => handleChange(e, car.id, 'tarih')}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor={`saat-${car.id}`}>Rental Hours:</label>
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
                      Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-section">
            <button className="btn-primary kirala-button" onClick={handleRent}>
              Rent
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;

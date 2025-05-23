import React from 'react';
import { useNavigate } from 'react-router-dom';

function CarCard({ car, addToCart }) {
  const navigate = useNavigate();

  

  if (!car) {
    console.error("CarCard: 'car' prop is missing");
    return null;
  }

  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>{car.price} ₺ / gün</p>
      <p>Yıl: {car.year}</p>

      <button onClick={() => navigate(`/car/${car.id}`)}>Detaylar</button>

      {addToCart && (
        <button onClick={() => addToCart(car)}>Sepete Ekle</button>
      )}
    </div>
  );
}

export default CarCard;

import React from 'react';

function CarCard({ image, name, price }) {
  return (
    <div className="car-card">
      <img src={image} alt={name}/>
      <h3>{name}</h3>
      <p>{price} ₺ / gün</p>
      <button>Detaylar</button>
    </div>
  );
}

export default CarCard;

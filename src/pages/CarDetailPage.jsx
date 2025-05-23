import React from 'react';
import { useParams } from 'react-router-dom';
import './CarDetailPage.css';

function CarDetailPage({ cars, addToCart }) {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id || c.id === parseInt(id));

  if (!car) return <p>Araç bulunamadı.</p>;

  return (
    <div className="car-detail">
      <h2>{car.name}</h2>
      <img src={car.image} alt={car.name} />
      <p>Fiyat: {car.price} ₺ / gün</p>
      <p>Yıl: {car.year}</p>
      <button onClick={() => addToCart(car)}>Sepete Ekle</button>
    </div>
  );
}

export default CarDetailPage;

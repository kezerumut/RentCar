// pages/CarDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import araba1 from '../img/araba1.jpg';
import araba2 from '../img/araba2.jpg';
import './CarDetailPage.css';


const dummyCars = [
  { id: 1, name: "Toyota Corolla", price: 800, image: araba1, desc: "Konforlu ve ekonomik bir araç" },
  { id: 2, name: "BMW 3.20i", price: 1400, image: araba2, desc: "Lüks ve performans bir arada" },
];

function CarDetailPage() {
  const { id } = useParams();
  const carId = parseInt(id); // string => int
  const car = dummyCars.find((c) => c.id === carId);

  if (!car) return <p>Araç bulunamadı.</p>;

  return (
    <div className="car-detail">
      <h2>{car.name}</h2>
      <img src={car.image} alt={car.name} />
      <p>{car.desc}</p>
      <p className="price">Günlük Fiyat: {car.price} ₺</p>
      <button>Kirala</button>
      <br></br>
      <button>Yorum yap</button>

    </div>
  );
}

export default CarDetailPage;

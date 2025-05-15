import React from 'react';
import CarCard from '../components/CarCard';
import araba1 from '../img/araba1.jpg';
import araba2 from '../img/araba2.jpg';

const dummyCars = [
  {
    id: 1,
    name: "Toyota Corolla",
    price: 800,
    image: araba1,
  },
  {
    id: 2,
    name: "BMW 3.20i",
    price: 1400,
    image: araba2,
  },
];

function CarsPage() {
  return (
    <div className="cars-page">
      <h2>Mevcut Araçlar</h2>
      <div className="car-list">
        {dummyCars.map((car) => (
         <CarCard
  key={car.id}
  id={car.id}
  image={car.image}
  name={car.name}
  price={car.price}
/>
        ))}
      </div>
    </div>
  );
}

export default CarsPage;

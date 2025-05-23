import React from 'react';
import CarCard from '../components/CarCard';

function CarsPage({ cars, addToCart }) {
  return (
    <div className="cars-page">
      <h2>Araçlar</h2>
      <div className="car-list">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default CarsPage;

import React from 'react';
import CarCard from '../components/CarCard';
import './CarsPage.css';

function CarsPage({ cars, addToCart, user }) {
  return (
    <div className="cars-page container my-4">
      <h2 className="text-white mb-4">Cars</h2>
      <div className="row">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} addToCart={addToCart} user={user} />
        ))}
      </div>
    </div>
  );
}

export default CarsPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardPage.css';


function CarCard({ car, addToCart, user }) {

  const navigate = useNavigate();

  

  if (!car) {
    console.error("CarCard: 'car' prop is missing");
    return null;
  }

  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>{car.price} $ / day</p>
      <p>Year: {car.year.slice(0, 4)}</p>


      <button onClick={() => navigate(`/car/${car.id}`)}>Details</button>

      {addToCart && (
        <button onClick={() => addToCart(car, user)}>Add to Cart</button>

      )}
    </div>
  );
}

export default CarCard;

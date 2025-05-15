import { Link } from "react-router-dom";

function CarCard({ id, image, name, price }) {
  return (
    <div className="car-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price} ₺ / gün</p>
      <Link to={`/cars/${id}`}>
        <button>Detaylar</button>
      </Link>
    </div>
  );
}

export default CarCard;

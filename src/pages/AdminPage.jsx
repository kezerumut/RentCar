import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost/rentcar-api/getCars.php")
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Admin veri hatası:", err));
  }, []);

  return (
    <div>
      <h1>Admin Paneli</h1>
      {cars.length === 0 ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              {car.name} - {car.price} ₺
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPage;

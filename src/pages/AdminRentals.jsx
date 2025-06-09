import React, { useEffect, useState } from 'react';

function AdminRentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetch("http://localhost/rentcar-api/getRentals.php")
      .then(res => res.json())
      .then(data => setRentals(data))
      .catch(err => console.error("Kiralama verisi alınamadı:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Kiralama Kayıtları</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Kullanıcı</th>
            <th>Araç</th>
            <th>Adres</th>
            <th>Tarih</th>
            <th>Saat</th>
            <th>Oluşturulma</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.username}</td>
              <td>{rental.car_name}</td>
              <td>{rental.adres}</td>
              <td>{rental.tarih}</td>
              <td>{rental.saat}</td>
              <td>{rental.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRentals;

import React, { useEffect, useState } from 'react';
import './AdminPage.css';

function AdminPage() {
  const [form, setForm] = useState({ name: "", price: "", image: "", year: "" });
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);

  

  // Araçları çek
  useEffect(() => {
    fetch("http://localhost/rentcar-api/getCars.php")
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const endpoint = isEditing
    ? "http://localhost/rentcar-api/updateCar.php"
    : "http://localhost/rentcar-api/addCar.php";

  const payload = isEditing ? { ...form, id: editId } : form;

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(isEditing ? "Araç güncellendi" : "Araç eklendi");
        setForm({ name: "", price: "", image: "", year: "" });
        setIsEditing(false);
        setEditId(null);
        fetch("http://localhost/rentcar-api/getCars.php")
          .then(res => res.json())
          .then(data => setCars(data));
      } else {
        alert("Hata: " + data.message);
      }
    });
};

  const deleteCar = (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    fetch("http://localhost/rentcar-api/deleteCar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Araç silindi");
          setCars(prev => prev.filter(car => car.id !== id));
        } else {
          alert("Hata: " + data.message);
        }
      });
  };

  return (
    <div className="admin-page">
      <div className="admin-form">
        <h2>Yeni Araç Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Araç Adı" required />
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Fiyat (₺)" required />
          <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Resim Dosya Adı" required />
          <input type="number" name="year" value={form.year} onChange={handleChange} placeholder="Model Yılı" required />
          <button type="submit">Ekle</button>
        </form>
      </div>

      <div className="admin-list">
        <h2>Mevcut Araçlar</h2>
        <table>
          <thead>
            <tr>
              <th>Ad</th>
              <th>Fiyat</th>
              <th>Yıl</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>{car.name}</td>
                <td>{car.price} ₺</td>
                <td>{car.year}</td>
                <td>
  <button onClick={() => deleteCar(car.id)}>Sil</button>
  <button onClick={() => {
    setIsEditing(true);
    setEditId(car.id);
    setForm({
      name: car.name,
      price: car.price,
      image: car.image,
      year: car.year
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}>
    Düzenle
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;

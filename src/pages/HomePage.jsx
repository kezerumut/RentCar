import React, { useEffect, useState } from 'react';
import './HomePage.css';
import CarCard from '../components/CarCard';
import araba1 from '../img/arabalar.jpeg';
import { Link, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

function HomePage({ addToCart, cars }) {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: "", comment: "" });

  // Sayfa ilk yüklendiğinde localStorage'dan yorumları çek
  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Her yorum eklendiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewForm.name && reviewForm.comment) {
      setReviews(prev => [...prev, reviewForm]);
      setReviewForm({ name: "", comment: "" });
    }
  };

  return (
    <div className="page-container">
      <main className="main-content" id='home'>
        <h1>Rent Your Dream Car</h1>
        <div>
          <Slider />
        </div>
        <p>Quality vehicles at the most affordable prices are here.</p> 
        <div className="image-container">
          <img src={araba1} alt="home" />
          <Link to="/cars" className="image-button">Now Rent</Link>
        </div>

        <section className="car-list">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} addToCart={addToCart} />
          ))}
        </section>
      </main>

      <section className="about" id="about">
        <div className="heading">
          <h1>Who I Am & What This Project Is</h1>
        </div>
        <div className="about-container">
          <div className="about-img">
          </div>
          <div className="about-text">
            <span>Hello, I'm Umut Kezer</span>
            <p>I'm a senior Computer Engineering student at Çukurova University. I have a strong interest in software development, especially in web technologies.</p>
            <p>This car rental project is my graduation thesis project. I built a fully functional system with both user and admin panels using React, PHP, and MySQL.</p>
            <a href="https://github.com/kezerumut" className="btn" target="_blank" rel="noopener noreferrer">Visit My GitHub</a>
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="heading">
          <span>Reviews</span>
          <h1>What Our Visitors Say</h1>
        </div>

        <form className="review-form" onSubmit={handleReviewSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={reviewForm.name}
            onChange={handleReviewChange}
            required
          />
          <textarea
            name="comment"
            placeholder="Your Comment"
            value={reviewForm.comment}
            onChange={handleReviewChange}
            required
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>

        <div className="reviews-container">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((rev, index) => (
            <div className="box" key={index}>
              <h2>{rev.name}</h2>
              <p>{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        © 2025 - RentCarApp. All rights reserved.
        <a href="https://github.com/kezerumut">Git</a>
      </footer>
    </div>
  );
}

export default HomePage;

import React from 'react';
import './HomePage.css';
import CarCard from '../components/CarCard';
import araba1 from '../img/arabalar.jpeg';
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

function HomePage({ addToCart, cars }) {
  return (
    <div className="page-container">
      
      <main className="main-content" id='home'>
        <h1>Hayalinizdeki Aracı Kiralayın</h1>
        <div>
          <Slider />
        </div>
        <p>En uygun fiyatlarla kaliteli araçlar burada.</p> 
        <div className="image-container">
          <img src={araba1} alt="home" />
           <Link to="/cars" className="image-button">Şimdi Kirala</Link>
        </div>

        <section className="car-list">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} addToCart={addToCart} />
        ))}
        </section>
        
        <p>Burada kiralık araçlarla ilgili bilgiler olacak.</p>
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
          <h1>Whats Our Customers Say</h1>
        </div>
        <div className="reviews-container">
          <div className="box">
            <div className="rev-img"></div>
            <h2>Someone Name</h2>
            <p>Knight Online Hayat Offline</p>
          </div>
          <div className="box">
            <div className="rev-img"></div>
            <h2>Someone Name</h2>
            <p>Knight Online Hayat Offline</p>
          </div>
          <div className="box">
            <div className="rev-img"></div>
            <h2>Someone Name</h2>
            <p>Knight Online Hayat Offline</p>
          </div>
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

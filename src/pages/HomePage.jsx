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
          <button className="image-button">Şimdi Kirala</button>
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
          <span>About Us</span>
          <h1>Best Customer Experience</h1>
        </div>
        <div className="about-container">
          <div className="about-img"></div>
          <div className="about-text">
            <span>About Us</span>
            <p>Knight Online Hayat Offline</p>
            <p>Knight Online Hayat Offline</p>
            <a href="#" className="btn">Learn More</a>
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

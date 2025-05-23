import React from 'react';
import './HomePage.css';
import CarCard from '../components/CarCard';
import araba1 from '../img/arabalar.jpeg';
import logo from '../img/logo.png'; 
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

function HomePage({ addToCart, cars }) {
  return (
    <div className="page-container">
      <header className="header">
        <img src={logo} alt="RentCar Logo" className="logo" />
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#profile">Profile</a></li> 
            <li><Link to="/cart">Sepet</Link></li>
              
          </ul>
        </nav>

        <div className="header-btn">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </header>
      
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

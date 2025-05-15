import React from 'react';
import './HomePage.css';
import CarCard from '../components/CarCard';
import araba1 from '../img/arabalar.jpeg';
import car1 from '../img/araba2.jpg';
import car2 from '../img/araba3.jpg';
import logo from '../img/logo.png'; 
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

function HomePage() {

  const cars = [
    { image: car1, name: 'BMW 3 Serisi', price: 750 },
    { image: car2, name: 'Audi A4', price: 800 },
   
  ];
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
      <section className="car-list" id='services'>
      {cars.map((car, index) => (
        <CarCard key={index} {...car} />
      ))}
    </section>
      
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptatem incidunt dolores, impedit deleniti, tempore hic saepe repellat rem, consectetur tenetur reprehenderit! Minima, culpa commodi explicabo soluta quibusdam consequuntur ea perspiciatis quae odio magnam sequi laudantium veniam est rerum repellat officia, suscipit eaque dolores saepe, corrupti nostrum? Consequuntur provident architecto maxime dolor deleniti esse ut animi iste, voluptatem aspernatur, quod molestiae quo officia molestias quidem quia fuga ducimus sequi asperiores natus rerum. A nostrum porro voluptatem alias explicabo, recusandae veritatis reprehenderit rem laborum. Inventore autem similique animi quis adipisci accusantium ipsum, veritatis, repellendus beatae sunt eligendi, iure recusandae reiciendis laudantium!</p>
        <p>Burada kiralık araçlarla ilgili bilgiler olacak.</p>
        
      </main>

      <section class="about" id="about">
    <div class="heading">
        <span>About Us</span>
        <h1>Best Customer Experience</h1>
        </div>
        <div class="about-container">
            <div class="about-img">
                
            </div>
            <div class="about-text">
                <span>About Us</span>
                <p>Knight Online Hayat Offline</p>
                <p>Knight Online Hayat Offline</p>
                <a href="#" class="btn">Learn More</a>
            </div>
        </div>
</section>

<section class="reviews" id="reviews">
    <div class="heading">
        <span>Reviews</span>
        <h1>Whats Our Customers Say</h1>
        </div>
        <div class="reviews-container">
            <div class="box">
                <div class="rev-img">
                  
                </div>
                <h2>Someone Name</h2>
                <p>Knight Online Hayat Offline</p>
            </div>

            <div class="box">
                <div class="rev-img">
                   
                </div>
                <h2>Someone Name</h2>
                
                <p>Knight Online Hayat Offline</p>
            </div>

            <div class="box">
                <div class="rev-img">
                  
                </div>
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

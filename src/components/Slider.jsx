import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import './Slider.css';


import car1 from '../img/araba1.jpg';
import car2 from '../img/araba2.jpg';
import car3 from '../img/araba3.jpg';

function Slider() {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide><img src={car1} alt="Car 1" /></SwiperSlide>
        <SwiperSlide><img src={car2} alt="Car 2" /></SwiperSlide>
        <SwiperSlide><img src={car3} alt="Car 3" /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;

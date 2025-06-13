import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import './Slider.css';


import araba1 from '../img/araba1.jpg';
import araba2 from '../img/araba2.jpg';
import araba3 from '../img/araba3.jpg';

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
        <SwiperSlide><img src={araba1} alt="Araba 1" /></SwiperSlide>
        <SwiperSlide><img src={araba2} alt="Araba 2" /></SwiperSlide>
        <SwiperSlide><img src={araba3} alt="Araba 3" /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;

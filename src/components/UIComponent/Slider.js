// SliderComponent.js
import React from 'react';
import Slider from 'react-slick';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    { id: 1, img: 'https://via.placeholder.com/800x300?text=Slide+1' },
    { id: 2, img: 'https://via.placeholder.com/800x300?text=Slide+2' },
    { id: 3, img: 'https://via.placeholder.com/800x300?text=Slide+3' },
  ];

  return (
    <div>
      <h2> Simple Slider </h2>
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id}>
            <img src={slide.img} alt={`Slide ${slide.id}`} style={{ width: '100%' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;

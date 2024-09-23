import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample slides data
const slides = [
  {
    id: 1,
    image: "https://via.placeholder.com/1920x600/ff7f7f/333333?text=Slide+1",
    title: "Welcome to My Website",
    description: "This is the first slide description.",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/1920x600/7f7fff/333333?text=Slide+2",
    title: "Professional Design",
    description: "High-quality solutions for your needs.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/1920x600/7fff7f/333333?text=Slide+3",
    title: "Creative Ideas",
    description: "We bring your ideas to life.",
  },
];

const HeroSection = () => {
  const settings = {
    dots: true, // Display navigation dots
    infinite: true, // Infinite loop scrolling
    speed: 2000, // Transition speed (2 seconds)
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay speed (1 second)
    rtl: true, // Right-to-left scrolling
  };

  return (
    <div className="relative overflow-hidden w-full">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[600px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full max-w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">{slide.title}</h1>
              <p className="mt-4 text-lg md:text-2xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;

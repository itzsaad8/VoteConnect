import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample slides data
const slides = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2016/11/07/00/49/vote-1804596_960_720.jpg",
    title: "Welcome to VoteConnect",
    description:
      "VoteConnect offers an intuitive platform where you can easily create polls, share them with your audience, and gather responses effortlessly. Whether for professional use or casual voting, our system ensures a smooth experience for all users.",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2024/09/13/18/18/ai-generated-9045614_960_720.jpg",
    title: "Secure Polling System",
    description:
      "At VoteConnect, security and privacy are our top priorities. We utilize advanced encryption techniques to ensure that every vote is anonymous, protected, and counted accurately. Your opinion matters, and we make sure it’s safe with us.",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1707146618842-8795617df062?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Share and Engage",
    description:
      "Engage your community or friends by sharing polls instantly. VoteConnect allows you to copy and share poll links easily, giving your participants the ability to vote from any device. Track votes in real time and foster lively discussions around the results.",
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
    autoplaySpeed: 3000, // Autoplay speed (1 second)
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
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl md:text-6xl   font-bold">
                  {slide.title}
                </h1>
                <span className="h-1 bg-blue-900 rounded-full w-full"></span>
              </div>

              <p className="mt-4 text-lg px-12  opacity-70 md:text-2xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;

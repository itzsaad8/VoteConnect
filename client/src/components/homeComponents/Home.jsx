import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import Instructions from "./Instructions";
import Stats from "./Stats";
import Features from "./Features";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <Instructions />
      <Stats />
      <Features />
    </div>
  );
}

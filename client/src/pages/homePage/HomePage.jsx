import React from "react";
import HeroSection from "../../components/homeComponents/HeroSection";
import WhyChooseUs from "../../components/homeComponents/WhyChooseUs";
import Instructions from "../../components/homeComponents/Instructions";
import Stats from "../../components/homeComponents/Stats";
import Features from "../../components/homeComponents/Features";
import Footer from "../../components/homeComponents/Footer";

export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <WhyChooseUs />
      <Instructions />
      <Stats />
      <Features />
      <Footer  />
    </div>
  );
}

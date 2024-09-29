import React from "react";
import {
  FaHandsHelping,
  FaShieldAlt,
  FaBolt,
  FaThumbsUp,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaHandsHelping className="text-6xl text-blue-900 mb-4" />,
    title: "Expert Support",
    description:
      "We provide expert assistance and support, ensuring your success at every step.",
  },
  {
    id: 2,
    icon: <FaShieldAlt className="text-6xl text-blue-900 mb-4" />,
    title: "Reliability",
    description:
      "Our solutions are reliable and secure, designed to perform under any circumstances.",
  },
  {
    id: 3,
    icon: <FaBolt className="text-6xl text-blue-900 mb-4" />,
    title: "Fast & Efficient",
    description:
      "Experience lightning-fast performance and efficient solutions tailored to your needs.",
  },
  {
    id: 4,
    icon: <FaThumbsUp className="text-6xl text-blue-900 mb-4" />,
    title: "Customer Satisfaction",
    description:
      "Your satisfaction is our top priority, and we strive to exceed your expectations.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-950 mb-8">
          Why Choose Us
        </h2>
        <p className="text-center text-lg text-gray-600 mb-16">
          Discover the reasons why our clients trust us with their needs and how
          we can make a difference for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

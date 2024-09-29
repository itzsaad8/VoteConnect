import React from "react";

const featuresData = [
  {
    id: 1,
    title: "User-Friendly Interface",
    description:
      "Our platform is designed to be intuitive and easy to navigate, ensuring a smooth user experience.",
    icon: "🖥️", // Replace with an actual icon or image as needed
  },
  {
    id: 2,
    title: "Real-Time Polling",
    description:
      "Create and participate in polls instantly, with results updated in real time for maximum engagement.",
    icon: "📊", // Replace with an actual icon or image as needed
  },
  {
    id: 3,
    title: "Comprehensive Analytics",
    description:
      "Gain insights from detailed analytics to understand user engagement and poll performance.",
    icon: "📈", // Replace with an actual icon or image as needed
  },
  {
    id: 4,
    title: "Secure and Private",
    description:
      "We prioritize your privacy and security, ensuring that your data is safe and confidential.",
    icon: "🔒", // Replace with an actual icon or image as needed
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-blue-950 mb-8">Key Features</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover the benefits of using our platform and how it can enhance
          your polling experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-blue-950 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

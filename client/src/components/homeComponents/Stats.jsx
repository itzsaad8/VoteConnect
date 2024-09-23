import React, { useEffect, useState, useRef } from "react";
import { FaUserAlt, FaVoteYea, FaUsers } from "react-icons/fa";

const statsData = [
  {
    id: 1,
    title: "Total Users",
    value: 100,
    icon: <FaUserAlt className="text-5xl text-indigo-600 mb-4" />,
  },
  {
    id: 2,
    title: "Total Voters",
    value: 50,
    icon: <FaVoteYea className="text-5xl text-indigo-600 mb-4" />,
  },
  {
    id: 3,
    title: "Active Members",
    value: 200,
    icon: <FaUsers className="text-5xl text-indigo-600 mb-4" />,
  },
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const handleScroll = (entries) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true);
      observer.disconnect(); // Stop observing once it's visible
    }
  };

  const observer = new IntersectionObserver(handleScroll, {
    threshold: 0.1,
  });

  useEffect(() => {
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={statsRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Our Community at a Glance
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Join a vibrant community and make your voice heard. Here are some key
          statistics that highlight our impact.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                {" "}
                {/* Centering the icon */}
                {stat.icon}
              </div>
              <h3 className="text-3xl font-semibold text-indigo-600 mb-2">
                {isVisible ? <CountUp end={stat.value} duration={2} /> : 0}
              </h3>
              <p className="text-gray-700 text-lg">{stat.title}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-600">
          These numbers reflect our commitment to creating an inclusive and
          engaging platform for everyone. Together, we can make a difference!
        </p>
      </div>
    </section>
  );
};

// CountUp Component
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stepTime = Math.ceil((duration * 1000) / end);
    let currentCount = 0;

    const interval = setInterval(() => {
      if (currentCount < end) {
        currentCount += 1;
        setCount(currentCount);
      } else {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [end, duration]);

  return <>{count}</>;
};

export default Stats;

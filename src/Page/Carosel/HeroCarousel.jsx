import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const slides = [
  {
    img: "https://i.ibb.co/Tx60pB1m/imgi-13-woman-controlling-smart-devices-with-a-digital-tablet-at-home-1024x684.jpg",
    title: "Plan Your Habits",
    subtitle: "Track your daily routines and build strong habits.",
    cta: "Start Tracking"
  },
  {
    img: "https://i.ibb.co/vCJ7V3p8/7-1-650x650.webp",
    title: "Stay Healthy",
    subtitle: "Maintain fitness and wellness with daily tracking.",
    cta: "Add Habit Now"
  },
  {
    img: "https://i.ibb.co/rNHy3kt/imgi-12-couple-relaxing-with-at-home.jpg",
    title: "Boost Productivity",
    subtitle: "Focus on your tasks and achieve your goals consistently.",
    cta: "Explore Habits"
  }
];

const HeroCarousel = () => {
  return (
    <div className="relative w-full h-96">
      <div className="carousel w-full h-full">
        {slides.map((slide, index) => (
          <div key={index} id={`item${index + 1}`} className="carousel-item w-full relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/40 text-white px-4">
              
              {/* Motion + Typewriter Title */}
              <motion.h1
                className="text-3xl sm:text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typewriter
                  words={[slide.title]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-sm sm:text-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                className="btn bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {slide.cta}
              </motion.button>

            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <a
            key={index}
            href={`#item${index + 1}`}
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-cyan-400 transition-all"
          ></a>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

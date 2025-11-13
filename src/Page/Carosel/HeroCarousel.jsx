import React, { useState, useEffect } from "react";
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
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden ">
      {slides.map((slide, index) => (
        index === current && (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
              <motion.h1
                className="text-3xl sm:text-5xl font-bold mb-2 text-white" // ✅ Title color white
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
              <motion.p
                className="text-sm sm:text-lg mb-4 text-white" // Subtitle white for better contrast
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
              >
                {slide.subtitle}
              </motion.p>
              <motion.button
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {slide.cta}
              </motion.button>
            </div>
          </motion.div>
        )
      ))}

      {/* Navigation */}
      <button
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-10"
      >
        {"<"}
      </button>
      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-10"
      >
        {">"}
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${current === i ? "bg-white w-4" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

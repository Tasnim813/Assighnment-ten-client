import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaRegSmile, FaClock, FaChartLine } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaBrain />,
    title: 'Better Focus',
    description: 'Improve concentration and stay on track with your daily habits.',
    color: 'text-purple-600',
  },
  {
    icon: <FaRegSmile />,
    title: 'Reduced Stress',
    description: 'Build routines that help you relax and reduce anxiety.',
    color: 'text-pink-500',
  },
  {
    icon: <FaClock />,
    title: 'Time Management',
    description: 'Plan your day efficiently and make the most of your time.',
    color: 'text-purple-600',
  },
  {
    icon: <FaChartLine />,
    title: 'Track Progress',
    description: 'Monitor your habit streaks and see your personal growth.',
    color: 'text-pink-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WhyBuildHabits = () => {
  return (
    <motion.div
      className="mt-20 px-4 md:px-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold text-purple-700 mb-12 text-center">
        Why Build Habits?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 15px 30px rgba(0,0,0,0.2)',
              backgroundColor: '#f9f5ff',
            }}
            className="flex flex-col items-center bg-white rounded-3xl p-6 shadow-lg transition-all duration-300"
          >
            <motion.div
              className={`text-5xl mb-4 ${benefit.color}`}
              whileHover={{ rotate: 15, scale: 1.2, transition: { duration: 0.3 } }}
            >
              {benefit.icon}
            </motion.div>

            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {benefit.title}
            </h3>

            <p className="text-gray-600 text-center text-sm">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WhyBuildHabits;

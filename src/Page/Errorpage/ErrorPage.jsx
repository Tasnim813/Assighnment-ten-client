import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-100 via-white to-purple-200 p-4 text-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="bg-white shadow-lg rounded-full p-6 border-4 border-purple-400 mb-6"
      >
        <FaExclamationTriangle className="text-purple-600 text-5xl" />
      </motion.div>

      {/* Animated Text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl font-extrabold text-purple-700 mb-2"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-semibold text-gray-700 mb-4"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 max-w-md mb-6"
      >
        You don’t have permission to view this page. Please log in or go back to
        the homepage.
      </motion.p>

      {/* Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-all"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;

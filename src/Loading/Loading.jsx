import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200">
      {/* Spinner Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        className="relative"
      >
        <div className="w-20 h-20 border-8 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-lg font-semibold text-purple-700 tracking-wide"
      >
        Loading<span className="animate-pulse">...</span>
      </motion.p>
    </div>
  );
};

export default Loading;

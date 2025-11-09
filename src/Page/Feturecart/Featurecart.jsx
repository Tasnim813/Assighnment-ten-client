import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Featurecart = ({ cart }) => {
    const{image,_id}=cart
    // console.log(cart)
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      className="max-w-sm bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl shadow-xl overflow-hidden m-4 border-t-4 border-purple-600 transition-all duration-300"
    >
      {/* Habit Image */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-3xl"
          src={image}
          alt={cart.title}
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
          {cart.category}
        </span>
      </div>

      <div className="p-5 space-y-3">
        {/* Habit Title */}
        <h3 className="text-2xl font-extrabold text-purple-700">{cart.title}</h3>

        {/* Short Description */}
        <p className="text-gray-700 text-sm">{cart.description}</p>

        {/* Creator Info */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-gray-500 text-xs">By: {cart.creatorName}</p>
          {/* Streak / Badge Example */}
          <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
            New
          </span>
        </div>

        {/* View Details Button */}
        <Link to={`/health-details/${_id}`} className="btn w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-2xl hover:opacity-90 transition font-semibold shadow-lg mt-3">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Featurecart;

import React from 'react';
import { useLoaderData } from 'react-router';

const CartDetails = () => {
    const data=useLoaderData()
    console.log(data)
    return (
           <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-3xl shadow-xl">
      {/* Habit Image */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-80 object-cover rounded-2xl mb-6"
        />
      )}

      {/* Title & Category */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-purple-700">{data.title}</h1>
        <span className="bg-purple-600 text-white px-4 py-1 rounded-full font-semibold">
          {data.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-6">{data.description}</p>

      {/* Creator Info */}
      {data.creatorName && (
        <p className="text-gray-500 mb-4">
          Created by: <span className="font-semibold">{data.creatorName}</span>
        </p>
      )}

      {/* Reminder Time */}
      {data.reminderTime && (
        <p className="text-gray-500 mb-4">
          Reminder: <span className="font-semibold">{data.reminderTime}</span>
        </p>
      )}
    </div>

    );
};

export default CartDetails;
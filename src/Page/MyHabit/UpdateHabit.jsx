import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const UpdateHabit = () => {
  const loadedHabit = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: loadedHabit.title || "",
    description: loadedHabit.description || "",
    category: loadedHabit.category || "",
    reminderTime: loadedHabit.reminderTime || "",
    image: loadedHabit.image || "",
    isPublic: loadedHabit.isPublic || false,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`https://habit-tracker-server-six.vercel.app/habit/${loadedHabit._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "✅ Habit Updated!",
            text: "Your habit details have been successfully updated.",
            confirmButtonColor: "#7e22ce",
          });
          navigate("/myHabit");
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes Made",
            text: "You didn't modify any fields.",
            confirmButtonColor: "#7e22ce",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "❌ Update Failed!",
          text: "Something went wrong. Please try again.",
          confirmButtonColor: "#7e22ce",
        });
        console.error(err);
      });
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white border border-purple-200 shadow-lg rounded-2xl p-8 my-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
        Update Habit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Habit Title */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Habit Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
            rows="3"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          />
        </div>

        {/* Reminder Time */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Reminder Time
          </label>
          <input
            type="time"
            name="reminderTime"
            value={formData.reminderTime}
            onChange={handleChange}
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/habit.jpg"
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          />
        </div>

        {/* Public / Private Toggle */}
        <div className="flex items-center gap-3 mt-3">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="w-5 h-5 accent-purple-600"
          />
          <label className="text-gray-700 font-medium">
            Make this habit public
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
            loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Updating..." : "Update Habit"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UpdateHabit;

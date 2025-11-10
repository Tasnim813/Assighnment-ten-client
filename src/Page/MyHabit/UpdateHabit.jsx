import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateHabit = () => {
  const loadedHabit = useLoaderData();
  console.log(loadedHabit)
  const navigate = useNavigate();

  // Local state for form fields
  const [formData, setFormData] = useState({
    title: loadedHabit.title || "",
    description: loadedHabit.description || "",
    category: loadedHabit.category || "",
    reminderTime: loadedHabit.reminderTime || "",
    image: loadedHabit.image || "",
    isPublic: loadedHabit.isPublic || false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/habit/${loadedHabit._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result.modifiedCount ) {
          Swal.fire({
            icon: "success",
            title: "Habit Updated!",
            text: "Your habit details have been successfully updated.",
          });
          navigate("/myHabit");
        }
      })
      .catch((err) => console.error(err));
  };

 

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Update Habit
      </h2>

      <form  onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Habit Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          />
        </div>

        {/* Reminder Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Reminder Time
          </label>
          <input
            type="time"
            name="reminderTime"
            value={formData.reminderTime}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          />
        </div>

        {/* Public / Private */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-gray-700 font-medium">Make Public</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold mt-4 transition"
        >
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default UpdateHabit;

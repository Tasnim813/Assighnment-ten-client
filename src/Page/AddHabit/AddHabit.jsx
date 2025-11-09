import React, { useState, useContext } from "react";

import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];

const AddHabit = () => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [reminderTime, setReminderTime] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !category || !reminderTime) {
      toast.error("Please fill all required fields!");
      return;
    }

    const habitData = {
      title,
      description,
      category,
      reminderTime,
      image,
      userName: user?.displayName,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
      completionHistory: [],
    };

    try {
      const res = await fetch("http://localhost:3000/health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData),
      });

      if (res.ok) {
        toast.success("Habit added successfully!");
        // Clear form
        setTitle("");
        setDescription("");
        setCategory(categories[0]);
        setReminderTime("");
        setImage("");
      } else {
        toast.error("Failed to add habit.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">
          Add New Habit
        </h1>

        {/* Habit Title */}
        <div>
          <label className="block text-gray-700 mb-1">Habit Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter habit title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe your habit"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Reminder Time */}
        <div>
          <label className="block text-gray-700 mb-1">Reminder Time</label>
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 mb-1">Image URL (Optional)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter image URL"
          />
        </div>

        {/* User Name (Read-only) */}
        <div>
          <label className="block text-gray-700 mb-1">User Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        {/* User Email (Read-only) */}
        <div>
          <label className="block text-gray-700 mb-1">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 transition font-semibold"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabit;

import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddHabit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newHabit = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      reminderTime: e.target.reminderTime.value,
      image: e.target.image.value,
      creatorEmail: user?.email,
      creatorName: user?.displayName,
      createdAt: new Date(),
      isPublic: true,
    };

    fetch("https://habit-tracker-server-six.vercel.app/habit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newHabit),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          Swal.fire({
            title: "✅ Habit Added!",
            text: "Your habit was successfully added.",
            icon: "success",
            confirmButtonColor: "#7e22ce",
          });
          e.target.reset();
          navigate("/myHabit");
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          title: "❌ Error!",
          text: "Failed to add habit. Try again.",
          icon: "error",
          confirmButtonColor: "#7e22ce",
        });
      });
  };

  if(loading){
    return <Loading></Loading>
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white border border-purple-200 shadow-lg rounded-2xl p-8 my-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
        Add a New Habit
      </h2>

      <form onSubmit={handleAddHabit} className="space-y-5">
        {/* Habit Title */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Habit Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter habit title"
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            required
            placeholder="Describe your habit..."
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Category</label>
          <select
            name="category"
            required
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          >
            <option value="">Select Category</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        {/* Reminder Time */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            required
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Image URL (optional)
          </label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/habit.jpg"
            className="w-full border border-purple-300 focus:border-purple-500 px-4 py-2 rounded-xl outline-none"
          />
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2 text-gray-700">User Name</label>
            <input
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="w-full border border-purple-200 bg-gray-50 px-4 py-2 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">User Email</label>
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="w-full border border-purple-200 bg-gray-50 px-4 py-2 rounded-xl"
            />
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
            loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Adding..." : "Add Habit"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddHabit;

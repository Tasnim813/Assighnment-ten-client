import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

import { useNavigate } from "react-router";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
const navigate=useNavigate()
  const handleAddHabit = (e) => {
    e.preventDefault();
  
      const  newHabit={
        
     title : e.target.title.value,
     description : e.target.description.value,
     category : e.target.category.value,
     reminderTime : e.target.reminderTime.value,
    image : e.target.image.value,
    creatorEmail : user?.email,
    creatorName : user?.displayName,
    createdAt: new Date(),
    isPublic: true


      }
   
    console.log(newHabit)

    fetch('http://localhost:3000/habit', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newHabit)
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoading(false);
        if (data.insertedId) {
          Swal.fire({
            title: "Habit Added!",
            text: "Your habit was successfully added.",
            icon: "success",
          });
          e.target.reset();
          navigate('/myHabit')

        }
      })
      .catch(() => {
        ;
        Swal.fire({
          title: "Error!",
          text: "Failed to add habit. Try again.",
          icon: "error",
        });
      });
  };
  

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 my-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Add a New Habit
      </h2>

      <form onSubmit={handleAddHabit} className="space-y-4">
        {/* Habit Title */}
        <div>
          <label className="block font-medium mb-1">Habit Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter habit title"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            required
            placeholder="Describe your habit..."
            className="w-full border px-3 py-2 rounded-md"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            required
            className="w-full border px-3 py-2 rounded-md"
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
          <label className="block font-medium mb-1">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">
            Image URL (optional)
          </label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/habit.jpg"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">User Name</label>
            <input
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="w-full border px-3 py-2 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">User Email</label>
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="w-full border px-3 py-2 rounded-md bg-gray-100"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
        
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4 font-semibold"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabit;

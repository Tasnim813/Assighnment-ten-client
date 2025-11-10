import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Habit from "./Habit";
import { Link } from "react-router";


const Myhabit = () => {
  const { user } = useContext(AuthContext);
  const [model, setModel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-habit?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching habits:", err);
        setLoading(false);
      });
  }, [user?.email]); 

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>Loading your habits...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Habits
      </h2>

      {model.length === 0 ? (
        <div className="text-center bg-gray-50 p-10 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            There are no habits yet 😕
          </h3>
          <p className="text-gray-600 mb-4">
            Start building good habits today!
          </p>
          <Link
            to="/addHabit"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            ➕ Add a Habit
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {model.map((cart) => (
            <Habit key={cart._id || cart.id} cart={cart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Myhabit;

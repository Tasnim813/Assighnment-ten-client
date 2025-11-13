import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Habit from "./Habit";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";

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
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">
        My Habits
      </h2>

      {model.length === 0 ? (
        <div className="text-center bg-white border border-purple-200 p-10 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            There are no habits yet 😕
          </h3>
          <p className="text-gray-600 mb-4">
            Start building good habits today!
          </p>
          <Link
            to="/addHabit"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            ➕ Add a Habit
          </Link>
        </div>
      ) : (
        <div className=" ">
          {model.map((cart) => (
            <motion.div
              key={cart._id || cart.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Habit cart={cart} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myhabit;

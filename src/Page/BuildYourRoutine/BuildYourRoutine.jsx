import { motion } from "framer-motion";
import { FaBrain, FaClock, FaRunning } from "react-icons/fa";

const BuildYourRoutine = () => {
  return (
    <section className="py-20 px-6 md:px-10 lg:px-20 bg-gradient-to-r from-purple-50 via-white to-purple-100 rounded-3xl mt-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Build Your Perfect Routine
      </motion.h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Every big goal starts with small, consistent actions. Discover how daily routines can shape your success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: <FaBrain />,
            title: "Set Clear Intentions",
            text: "Start small. Define what habit you want to build and why it matters.",
          },
          {
            icon: <FaClock />,
            title: "Stay Consistent",
            text: "Habits grow when you practice them daily, even for 5 minutes.",
          },
          {
            icon: <FaRunning />,
            title: "Keep Moving Forward",
            text: "Don’t wait for motivation—build discipline and momentum.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition-all"
          >
            <div className="text-5xl text-purple-600 mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default BuildYourRoutine;

import { motion } from "framer-motion";
import { FaChartLine, FaTrophy, FaCalendarCheck } from "react-icons/fa";

const TrackProgress = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-10 lg:px-20 mt-16 bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-3xl shadow-inner">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-purple-400 via-purple-200 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-4">
          Track Your Progress
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14 text-sm md:text-base">
          Stay motivated by tracking your achievements daily. Visualize your
          consistency, celebrate milestones, and keep your growth steady.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaChartLine />,
              title: "See Your Growth",
              text: "Visualize improvement and stay inspired with beautiful habit analytics.",
            },
            {
              icon: <FaCalendarCheck />,
              title: "Daily Check-ins",
              text: "Mark your daily streaks and build discipline through routine tracking.",
            },
            {
              icon: <FaTrophy />,
              title: "Celebrate Wins",
              text: "Reward yourself for hitting milestones — success builds momentum!",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-all"
            >
              <div className="text-5xl text-purple-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TrackProgress;

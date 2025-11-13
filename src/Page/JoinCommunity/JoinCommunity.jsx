import { motion } from "framer-motion";
import { FaUsers, FaHeart, FaHandshake } from "react-icons/fa";

const JoinCommunity = () => {
  return (
    <section className="w-11/12 mx-auto relative py-20 px-6 md:px-10 lg:px-20 mt-20 bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 rounded-3xl overflow-hidden">
      {/* Decorative blur backgrounds */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side - Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-700 max-w-lg mb-8 text-sm md:text-base">
            Build habits together with positive people. Share progress, inspire
            others, and grow stronger through community motivation. It’s easier
            to stay consistent when you’re not doing it alone!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <button className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition-all duration-300">
              Join Now & Start Building!
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side - Cards Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8"
        >
          {[
            {
              icon: <FaUsers />,
              title: "Supportive Members",
              text: "Connect with others who share your growth journey.",
            },
            {
              icon: <FaHeart />,
              title: "Daily Motivation",
              text: "Get inspired every day with encouragement and shared wins.",
            },
            {
              icon: <FaHandshake />,
              title: "Grow Together",
              text: "Stay accountable and consistent by tracking habits with friends.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all"
            >
              <div className="text-5xl text-purple-600 mb-4">{item.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCommunity;

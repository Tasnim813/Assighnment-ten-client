import { motion } from "framer-motion";

const SuccessStories = () => {
  const stories = [
    {
      name: "Amina Rahman",
      quote:
        "I started tracking my morning habits and became more focused every day!",
      image: "https://i.ibb.co.com/JwFWpq1K/360-F-757612374-09-Q9dyx-OKbyn-Ci-T3h-MUyk3i-Euo-R1-Rg-Jy.jpg",
    },
    {
      name: "Rafiul Hasan",
      quote:
        "Building small habits helped me stay consistent with workouts for 90 days straight!",
      image: "https://i.ibb.co.com/CK2BnhzV/3929121.webp",
    },
    {
      name: "Tania Akter",
      quote:
        "The tracker helped me stay accountable and reduce procrastination.",
      image: "https://i.ibb.co.com/9khpdbWt/2a7d4c4bc1381a476b8b8a85885ac392.jpg",
    },
    {
      name: "Mahfuz Alam",
      quote:
        "This app completely changed how I plan my mornings — I feel more productive!",
      image: "https://i.ibb.co.com/vCQN9wfn/93f40ec756290812571be534e12bcfe7.jpg",
    },
    {
      name: "Raisa Chowdhury",
      quote:
        "The community and streak system kept me consistent for over 100 days.",
      image: "https://i.ibb.co.com/chY7ZcrW/pngtree-poised-identity-a-formal-passport-photo-of-young-muslim-woman-png-image-16748447.webp",
    },
    {
      name: "Nafis Islam",
      quote:
        "Small steps each day really do make a big difference. Love the clean design!",
      image: "https://i.ibb.co.com/GQPKsmBf/images.jpg",
    },
  ];

  // Duplicate array for infinite loop effect
  const duplicatedStories = [...stories, ...stories];

  return (
    <section className="relative py-20    rounded-3xl mt-20 overflow-hidden">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Success Stories from Our Users
      </motion.h2>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {duplicatedStories.map((s, idx) => (
            <motion.div
              key={idx}
              className="min-w-[280px] md:min-w-[320px] bg-purple-300 p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={s.image}
                alt={s.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-3">"{s.quote}"</p>
              <h4 className="text-lg font-semibold text-purple-700">
                {s.name}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <p className="text-center text-gray-600 mt-10 text-sm">
        🌟 Join thousands of people building better habits every day!
      </p>
    </section>
  );
};

export default SuccessStories;

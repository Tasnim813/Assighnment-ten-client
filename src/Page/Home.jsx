import React from "react";

import Featurecart from "./Feturecart/Featurecart";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import WhyBuildHabits from "./WhyBuildHabits/WhyBuildHabits";
import Banner from "./Carosel/HeroCarousel";
import HeroCarousel from "./Carosel/HeroCarousel";


const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const Home = () => {
  const data = useLoaderData();
//   console.log(data);

  return (
    <div className="px-4 md:px-10 lg:px-20">
      
      {/* Hero Banner / Slider with Typewriter */}
     <Banner></Banner>
     {/* <HeroCarousel></HeroCarousel> */}

      {/* Featured Habits Section */}
      <motion.h2
        className="text-3xl font-bold text-purple-700 mt-16 mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Featured Habits
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((cart) => (
          <Featurecart key={cart._id} cart={cart} />
        ))}
      </motion.div>

      {/* Why Build Habits Section */}
      <WhyBuildHabits />
      
      {/* Optional: Extra Sections */}
      {/* তুমি এখানে ২টি relevant section add করতে পারো */}

    </div>
  );
};

export default Home;

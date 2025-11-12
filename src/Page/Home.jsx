import React from "react";
import Featurecart from "./Feturecart/Featurecart";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import WhyBuildHabits from "./WhyBuildHabits/WhyBuildHabits";
import HeroCarousel from "./Carosel/HeroCarousel";
import TrackProgress from "./TrackProgress/TrackProgress";
import JoinCommunity from "./JoinCommunity/JoinCommunity";
import BuildYourRoutine from "./BuildYourRoutine/BuildYourRoutine";
import SuccessStories from "./SuccessStories/SuccessStories";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const Home = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div >
      {/* Hero Section */}
      <HeroCarousel />

      {/* Featured Habits Section */}
      <div className="w-11/12 mx-auto">
        <motion.div
        className="text-center mt-16 mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-purple-700">
          Featured Habits
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Discover some of the most effective habits that can help you stay
          consistent, boost your productivity, and improve your lifestyle.
          These featured habits are selected to help you build lasting
          routines and achieve your daily goals through our Habit Tracker.
        </p>
      </motion.div>

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
      </div>

      {/* Why Build Habits Section */}
      <WhyBuildHabits />

      <TrackProgress></TrackProgress>
      <JoinCommunity></JoinCommunity>
      <BuildYourRoutine></BuildYourRoutine>
      <SuccessStories></SuccessStories>
    </div>
  );
};

export default Home;

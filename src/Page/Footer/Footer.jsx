import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-10 ">
      <div className="container mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo and About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
              alt="Habit Tracker Logo"
              className="w-10 h-10 rounded-full border border-white"
            />
            <h2 className="text-2xl font-bold text-white">Habit Tracker</h2>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            Build strong habits, stay motivated, and track your progress daily.
            Your consistency builds your success 💪
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-purple-300 pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/dashboard" className="hover:text-purple-300">Dashboard</a></li>
            <li><a href="/add-habit" className="hover:text-purple-300">Add Habit</a></li>
            <li><a href="/browse" className="hover:text-purple-300">Browse Habits</a></li>
            <li><a href="/profile" className="hover:text-purple-300">Profile</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-purple-300 pb-1">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-purple-300">FAQs</a></li>
            <li><a href="/contact" className="hover:text-purple-300">Contact Us</a></li>
            <li><a href="/feedback" className="hover:text-purple-300">Feedback</a></li>
            <li><a href="/privacy" className="hover:text-purple-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-b border-purple-300 pb-1">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-purple-300"><FaFacebook /></a>
            <a href="#" className="hover:text-purple-300"><FaInstagram /></a>
            <a href="#" className="hover:text-purple-300"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-200 mt-10 border-t border-purple-500 pt-4">
        © {new Date().getFullYear()} <span className="font-semibold">Habit Tracker</span> — All Rights Reserved 💜
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link, useNavigate } from "react-router";
import SuccessAnimation from "../Component/SuccessAnimation";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { createUserWithEmailAndPasswordfunc, setUser } =
    useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    // ✅ Validation
    if (displayName.length < 5) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Name",
        text: "Name must be at least 5 characters long.",
        confirmButtonColor: "#9333ea",
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
        confirmButtonColor: "#9333ea",
      });
      return;
    }
    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Missing Uppercase",
        text: "Password must include at least one uppercase letter.",
        confirmButtonColor: "#9333ea",
      });
      return;
    }
    if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Missing Lowercase",
        text: "Password must include at least one lowercase letter.",
        confirmButtonColor: "#9333ea",
      });
      return;
    }

    setLoading(true);

    // ✅ Create user
    createUserWithEmailAndPasswordfunc(email, password)
      .then((result) => {
        const user = result.user;

        // Update profile info
        updateProfile(user, { displayName, photoURL })
          .then(() => {
            sendEmailVerification(user).then(() => {
              Swal.fire({
                icon: "info",
                title: "Verify Your Email",
                text: "A verification link has been sent to your email address.",
                confirmButtonColor: "#9333ea",
              });
            });

            // Sign out after registration
            signOut(auth)
              .then(() => {
                setUser(null);
                setSuccess(true);
                Swal.fire({
                  icon: "success",
                  title: "Account Created!",
                  text: "Check your email and verify your account.",
                  confirmButtonColor: "#9333ea",
                });
                setTimeout(() => {
                  setSuccess(false);
                  navigate("/login");
                }, 2500);
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Sign Out Failed",
                  text: error.message,
                  confirmButtonColor: "#9333ea",
                });
              });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: error.message,
              confirmButtonColor: "#9333ea",
            });
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "User Exists",
            text: "This email is already registered.",
            confirmButtonColor: "#9333ea",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: error.message,
            confirmButtonColor: "#9333ea",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 p-4">
      {success && <SuccessAnimation message="Account Created!" />}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-purple-200"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-center text-purple-700"
        >
          Register to Habit Tracker
        </motion.h1>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col space-y-1"
          >
            <label className="text-purple-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Name"
            />
          </motion.div>

          {/* Photo URL */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col space-y-1"
          >
            <label className="text-purple-700 font-semibold">Photo URL</label>
            <input
              type="url"
              name="photo"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Photo URL"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col space-y-1"
          >
            <label className="text-purple-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative flex flex-col space-y-1"
          >
            <label className="text-purple-700 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-purple-500 hover:text-purple-700"
            >
              {showPassword ? <FaEye size={20} />  : <FaEyeSlash size={20} /> }
            </span>
          </motion.div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all shadow-md"
          >
            Register
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-700 mt-5 text-sm"
        >
          Already have an account?{" "}
          <Link
            className="text-purple-600 hover:text-purple-800 font-medium"
            to="/login"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;

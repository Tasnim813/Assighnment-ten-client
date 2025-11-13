import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const googleprovider = new GoogleAuthProvider();

const Login = () => {
  const [show, setShow] = useState(false);
  const { setUser } = useContext(AuthContext);
  const emailRef = useRef(null);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!result.user?.emailVerified) {
          Swal.fire({
            icon: "warning",
            title: "Email Not Verified",
            text: "Please verify your email before logging in.",
            confirmButtonColor: "#9333ea",
          });
          return;
        }
        setUser(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          confirmButtonColor: "#9333ea",
        });
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.code,
          confirmButtonColor: "#9333ea",
        });
      });
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          text: `Welcome ${result.user.displayName || "User"}!`,
          confirmButtonColor: "#9333ea",
        });
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
          confirmButtonColor: "#9333ea",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-sm shadow-2xl rounded-2xl bg-white border border-purple-300"
      >
        <div className="p-6">
          <h1 className="text-purple-700 text-4xl mb-6 font-bold text-center">
            Login Now
          </h1>

          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-purple-700 font-semibold">Email</label>
              <input
                type="email"
                ref={emailRef}
                required
                name="email"
                className="input input-bordered w-full border-purple-300 focus:border-purple-500 text-gray-800"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="relative flex flex-col space-y-1">
              <label className="text-purple-700 font-semibold">Password</label>
              <input
                required
                type={show ? "text" : "password"}
                name="password"
                className="input input-bordered w-full border-purple-300 focus:border-purple-500 text-gray-800"
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 cursor-pointer text-purple-500 hover:text-purple-700"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn w-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md transition-all"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                className="text-purple-600 font-semibold hover:underline"
                to="/register"
              >
                Create an account
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-px w-16 bg-purple-300"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px w-16 bg-purple-300"></div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full bg-white border border-purple-400 text-purple-600 hover:bg-purple-100 font-semibold shadow-md transition-all"
            >
              Login with Google
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

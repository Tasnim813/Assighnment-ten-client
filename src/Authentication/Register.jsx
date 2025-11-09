import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { Link, useNavigate } from 'react-router';
import SuccessAnimation from '../Component/SuccessAnimation';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { createUserWithEmailAndPasswordfunc, setUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    // ✅ Validation
    if (displayName.length < 5) {
      toast.error('Name must be at least 5 characters');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error('Password must have at least one lowercase letter.');
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
            sendEmailVerification(user)
              .then(() => {
                toast.success('Check your email and verify your account!');
              });

            // Sign out after registration
            signOut(auth)
              .then(() => {
                toast.success('Signed out successfully');
                setUser(null);
                setSuccess(true);
                setTimeout(() => {
                  setSuccess(false);
                  navigate('/login');
                }, 2500);
              })
              .catch((error) => toast.error(error.message));
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("User already exists in the database");
        } else {
          toast.error(error.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-white to-pink-100 p-4">
      {success && <SuccessAnimation message="Account Created!" />}

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Register to Habit Tracker
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Name"
            />
          </div>

          {/* Photo URL */}
          <div className="flex flex-col space-y-1">
            <label className="text-gray-700 font-semibold">Photo URL</label>
            <input
              type="url"
              name="photo"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Photo URL"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email"
            />
          </div>

          {/* Password with show/hide icon */}
          <div className="relative flex flex-col space-y-1">
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              className="w-full border border-purple-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500 hover:text-pink-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white py-2 rounded-lg hover:opacity-90 transition font-semibold shadow-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4 text-sm">
          Already have an account?{' '}
          <Link className="text-purple-600 hover:text-pink-500 font-medium" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

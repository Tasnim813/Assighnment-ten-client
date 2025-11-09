import React, { useContext } from "react";

import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
        setUser(null);
      })
      .catch((error) => toast.error(error.message));
  };

  const Links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
            isActive ? "text-cyan-400" : "text-white hover:text-cyan-300"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/addHabit"
        className={({ isActive }) =>
          `px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
            isActive ? "text-cyan-400" : "text-white hover:text-cyan-300"
          }`
        }
      >
        Add Habit
      </NavLink>

      <NavLink
        to="/myHabit"
        className={({ isActive }) =>
          `px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
            isActive ? "text-cyan-400" : "text-white hover:text-cyan-300"
          }`
        }
      >
        My Habits
      </NavLink>

      <NavLink
        to="/browsePublicHabit"
        className={({ isActive }) =>
          `px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
            isActive ? "text-cyan-400" : "text-white hover:text-cyan-300"
          }`
        }
      >
        Browse Public Habits
      </NavLink>
    </>
  );

  return (
    <nav className="navbar sticky top-0 z-50 w-full bg-gradient-to-r from-[#081322]/90 to-[#0a0f1f]/90 backdrop-blur-lg border-b border-cyan-500/20 text-white shadow-md shadow-cyan-500/10">
      <div className="w-11/12 mx-auto flex justify-between items-center py-2">
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-2">
          {/* <img
            className="w-10 h-10 sm:w-14 sm:h-14"
            src="https://i.ibb.co.com/cKMk8Lwb/e71df2afa817fdc2af86fa2c0c5e4841-removebg-preview.png"
            alt="Logo"
          /> */}
          <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-cyan-300">
            Habit<span className="text-pink-400">Tracker</span>
          </span>
        </Link>

        {/* --- Desktop Links --- */}
        <div className="hidden lg:flex items-center space-x-2">{Links}</div>

        {/* --- Auth Buttons (Desktop) --- */}
        {!user ? (
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/login"
              className="bg-cyan-400 hover:bg-cyan-300 text-white font-semibold px-5 py-2 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-pink-400 hover:bg-pink-300 text-white font-semibold px-5 py-2 rounded-lg"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end hidden lg:block">
            <label tabIndex={0}>
              <img
                src={user?.photoURL || "https://via.placeholder.com/88"}
                alt="User"
                className="h-10 w-10 rounded-full border-2 border-cyan-400 cursor-pointer"
              />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-56 rounded-xl bg-[#101826] shadow-xl border border-cyan-700/40 p-4 text-center space-y-3"
            >
              <h1 className="text-lg font-bold text-cyan-300">
                {user?.displayName || user?.email}
              </h1>
              <Link
                to="/profile"
                className="bg-gradient-to-r from-cyan-400 to-pink-400 text-white font-semibold w-full rounded-md py-2"
              >
                My Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold w-full rounded-md py-2"
              >
                Sign Out
              </button>
            </ul>
          </div>
        )}

        {/* --- Mobile Menu --- */}
        <div className="lg:hidden dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-cyan-300 p-2 hover:bg-cyan-900/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content right-0 mt-3 w-56 p-4 rounded-xl bg-[#101826] shadow-lg border border-cyan-700/30 space-y-3"
          >
            {Links}
            <hr className="border-cyan-700/30" />
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-cyan-400 text-white w-full rounded-md py-2 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-400 text-white w-full rounded-md py-2 text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="bg-gradient-to-r from-cyan-400 to-pink-400 text-white w-full rounded-md py-2 text-center"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-red-500 to-orange-400 text-white w-full rounded-md py-2 text-center"
                >
                  Sign Out
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router";
import { FaSun, FaMoon, FaHome, FaPlus, FaClipboardList, FaUsers } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

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
          `flex items-center gap-1 px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
            isActive ? "text-purple-800 bg-purple-200 rounded-full " : "text-purple-500 hover:text-purple-700"
          }`
        }
      >
        <FaHome /> Home
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/addHabit"
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
                isActive ? "text-purple-800 bg-purple-200 rounded-full" : "text-purple-500 hover:text-purple-700"
              }`
            }
          >
            <FaPlus /> Add Habit
          </NavLink>

          <NavLink
            to="/myHabit"
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
                isActive ? "text-purple-600 bg-purple-200 rounded-full" : "text-purple-500 hover:text-purple-700"
              }`
            }
          >
            <FaClipboardList /> My Habits
          </NavLink>
        </>
      )}

      <NavLink
        to="/browsePublicHabit"
        className={({ isActive }) =>
          `flex items-center gap-1 px-3 py-2 font-semibold text-sm sm:text-base transition-colors duration-200 ${
            isActive ? "text-purple-600 bg-purple-200 rounded-full" : "text-purple-500 hover:text-purple-700"
          }`
        }
      >
        <FaUsers /> Browse Public Habits
      </NavLink>
    </>
  );

  return (
    <nav className="navbar sticky top-0 z-50 w-full bg-white text-purple-500 border-b border-purple-300 shadow-md shadow-purple-200">
      <div className="w-11/12 mx-auto flex justify-between items-center py-2">
        {/* Logo with Icon */}
        <Link to="/" className="flex items-center gap-2">
          <FaClipboardList className="text-purple-600 w-7 h-7" />
          <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-purple-600">
            HabitTracker
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-2">{Links}</div>

        {/* Auth Buttons */}
        {!user ? (
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/login"
              className="bg-purple-100 hover:bg-purple-200 text-purple-600 font-semibold px-5 py-2 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-100 hover:bg-purple-200 text-purple-600 font-semibold px-5 py-2 rounded-lg"
            >
             Signup
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end hidden lg:block">
  <label tabIndex={0}>
    <img
      src={user?.photoURL || "https://via.placeholder.com/88"}
      alt="User"
      className="h-10 w-10 rounded-full border-2 border-purple-500 cursor-pointer"
    />
  </label>
  <ul
    tabIndex={0}
    className="menu dropdown-content mt-3 w-56 rounded-xl bg-white shadow-xl border border-purple-300 p-4 text-center space-y-3"
  >
    <div>
      <h1 className="text-lg font-bold text-purple-600">
        {user?.displayName || "User"}
      </h1>
      <p className="text-sm font-bold text-purple-500">{user?.email}</p>
    </div>

    {/* Theme Toggle */}
    <div
      className="flex justify-center items-center py-2 cursor-pointer text-2xl"
      onClick={() => handleTheme(theme !== "dark")}
    >
      {theme === "dark" ? (
        <FaMoon className="text-purple-500" />
      ) : (
        <FaSun className="text-purple-500" />
      )}
    </div>

    <button
      onClick={handleSignOut}
      className="bg-purple-100 text-purple-600 font-semibold w-full rounded-md py-2"
    >
      Sign Out
    </button>
  </ul>
</div>
        )}

        {/* Mobile Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-purple-500 p-2 hover:bg-purple-100"
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
            className="menu menu-sm dropdown-content right-0 mt-3 w-56 p-4 rounded-xl bg-white shadow-lg border border-purple-300 space-y-3"
          >
            {Links}
            <hr className="border-purple-300" />
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-purple-100 text-purple-600 w-full rounded-md py-2 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-100 text-purple-600 w-full rounded-md py-2 text-center"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="bg-purple-100 text-purple-600 w-full rounded-md py-2 text-center"
              >
                Sign Out
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

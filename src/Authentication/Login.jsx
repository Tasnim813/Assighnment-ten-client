
import { useState } from "react";
import SuccessAnimation from "../Component/SuccessAnimation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase/Firebase';
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
          setSuccess(false);
        }, 2500);
      })
      .catch((err) => {
        setLoading(false);
        alert("Login failed! Check email or password.");
      });
  };

  // ✅ Google Login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
          setSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-white to-pink-100 px-4">
      {success && <SuccessAnimation message="Login Successful!" />}

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md relative"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Login to Habit Tracker
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-purple-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-purple-500"
            onClick={() => setShowPassword(!showPassword)}
          >
   {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 transition font-semibold mb-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 flex items-center justify-center py-2 rounded-lg hover:bg-gray-100 transition font-semibold text-gray-700"
        >
         <FcGoogle />
          Login with Google
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", { name, email, password },{ withCredentials: true } );

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Try again.");
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50  md:px-4">
      <div className="w-full max-w-md h-screen md:h-[60vh] max-w- md:bg-none md:shadow-lg md:rounded-md p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Create Account</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="user-name"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="user-email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="user-password"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500 text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

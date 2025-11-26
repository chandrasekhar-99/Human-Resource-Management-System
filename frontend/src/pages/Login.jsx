import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password },{ withCredentials: true } );
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />

          <input
            type="password"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

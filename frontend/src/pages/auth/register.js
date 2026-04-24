import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://medialert-backend-tz4c.onrender.com";

function Register() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
    storeId: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Failed to register");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Registration successful! You can now log in.");
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Register Error:", error);
      setErrorMsg("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">MediAlert</h1>
          <p className="text-gray-600">Smart Pharmacy System</p>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Create an Account
        </h2>
        <p className="text-gray-600 mb-6">
          Sign up to manage your pharmacy stock effectively.
        </p>

        {/* Error */}
        {errorMsg && (
          <p className="text-sm text-red-600 mb-4 p-2 bg-red-50 rounded">
            {errorMsg}
          </p>
        )}
        
        {/* Success */}
        {successMsg && (
          <p className="text-sm text-green-700 mb-4 p-2 bg-green-50 rounded">
            {successMsg}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            required
            minLength="6"
          />

          {/* Role */}
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          {/* Store ID */}
          <input
            type="text"
            placeholder="Store ID (Object ID)"
            value={formData.storeId}
            onChange={(e) =>
              setFormData({ ...formData, storeId: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            required
          />

          {/* Register button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 mt-2 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button 
             onClick={() => navigate("/")}
             className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

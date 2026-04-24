import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://medialert-backend-tz4c.onrender.com";

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setShowError(true);
        setIsLoading(false);
        return;
      }

      // Save in context + sessionStorage
      login({
        id: data.id,
        name: data.name || "User",
        email: data.email || formData.email,
        role: data.role,
        token: data.token,
        storeId: data.storeId,
      });

      // Navigate based on role
      if (data.role === "admin") navigate("/admin");
      else navigate("/staff");

    } catch (error) {
      console.error("Login Error:", error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleOTPLogin = () => {
  //   console.log("OTP login requested");
  // };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin");
      else navigate("/staff");
    }
  }, [user, navigate]);

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
          Welcome back
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your credentials to access your account
        </p>

        {/* Error */}
        {showError && (
          <p className="text-sm text-red-600 mb-4">
            Invalid email or password
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <input
            type="text"
            placeholder="Email or Username"
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
          />

          <div className="flex items-center justify-end text-sm">
            <button
               type="button"
               onClick={() => navigate("/forgot-password")}
               className="text-blue-600 text-sm hover:underline"
             >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* OTP button */}
          {/* <button
            type="button"
            onClick={handleOTPLogin}
            className="w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-100"
            disabled={isLoading}
          >
            Login with OTP
          </button> */}
        </form>

        <div className="w-full text-center border rounded-xl bg-blue-100 border-gray-300 my-4 py-2 ">
          <p>
            Used <span className="underline text-blue-500">rahul@gmail.com</span> as admin 
          </p>
          <p>
            Used <span className="underline text-blue-500">umesh@gmail.com</span> as staff 
          </p>
          <p>
           up1234 as password
          </p>
        </div>
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button 
             onClick={() => navigate("/register")}
             className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
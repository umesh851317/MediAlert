import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Here you would connect to a reset password API endpoint
    // e.g. await fetch('/api/auth/reset-password', { ... })
    
    setTimeout(() => {
      setMessage("If an account exists with this email, a password reset link has been sent.");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">MediAlert</h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <p className="text-sm text-green-700 mb-4 p-3 bg-green-50 rounded border border-green-200">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
            disabled={isLoading || message !== ""}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
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

export default ForgotPassword;

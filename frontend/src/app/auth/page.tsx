'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { Package, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
// // import { Button } from '@/app/components/ui/button';
// import { Input } from '@/app/components/ui/input';
// import { Label } from '@/app/components/ui/label';
// import { Checkbox } from '@/app/components/ui/checkbox';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
// import { Alert, AlertDescription } from '@/app/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    // Simulate login
    setTimeout(() => {
      if (formData.email && formData.password) {
        router.push('/');
      } else {
        setShowError(true);
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleOTPLogin = () => {
    // Handle OTP login
    console.log('OTP login requested');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              {/* <Package className="h-7 w-7 text-white" /> */}
            </div>
            <div>
              <h1 className="text-2xl font-bold">MediAlert</h1>
              <p className="text-sm text-blue-100">Smart Pharmacy System</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 space-y-8">
          {/* Illustration */}
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm p-8">
            <img
              src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&h=400&fit=crop"
              alt="Pharmacy"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Manage Your Pharmacy
              <br />
              Smarter & Safer
            </h2>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-sm text-white">Smart Stock</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                <span className="text-sm text-white">Expiry Alerts</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                <span className="text-sm text-white">Forecasting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-blue-100 text-sm">
          <p>© 2026 MediAlert. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
              {/* <Package className="h-8 w-8" /> */}
              <h1 className="text-2xl font-bold">MediAlert</h1>
            </div>
            <p className="text-gray-600">Smart Pharmacy System</p>
          </div>

          {/* <Card className="rounded-2xl shadow-lg border-gray-200">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900"> */}
                Welcome back
              {/* </CardTitle>
              <CardDescription className="text-gray-600"> */}
                Enter your credentials to access your account
              {/* </CardDescription>
            </CardHeader>
            <CardContent> */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Error Alert */}
                {/* {showError && (
                  <Alert variant="destructive" className="rounded-xl">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Invalid email or password. Please try again.
                    </AlertDescription>
                  </Alert>
                )} */}

                {/* Email Field */}
                <div className="space-y-2">
                  {/* <Label htmlFor="email">Email or Username</Label> */}
                  <div className="relative">
                    {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter your email or username"
                      value={formData.email}
                     //  onChange={(e) =>
                     //    setFormData({ ...formData, email: e.target.value })
                     //  }
                      className="pl-10 rounded-xl bg-gray-50 border-gray-200"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 rounded-xl bg-gray-50 border-gray-200"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                     //  onCheckedChange={(checked) =>
                     //    setFormData({ ...formData, rememberMe: checked as boolean })
                     //  }
                      disabled={isLoading}
                    /> */}
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Role Hint */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-xs text-blue-800">
                    💡 Login as <span className="font-semibold">Admin</span> or{' '}
                    <span className="font-semibold">Staff</span> based on your account.
                  </p>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>

                {/* OTP Login Button */}
                <button type="button" className="w-full rounded-xl border-gray-300 h-11" onClick={handleOTPLogin} disabled={isLoading} >
                                            Login with OTP
                                            </button>
                <button/>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need help?{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Contact Support
                  </a>
                </p>
              </div>
            {/* </CardContent> */}
          {/* </Card> */}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Default credentials
  const DEFAULT_PASSWORD = 'password123';

  // Check if already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      router.push('/');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // Generate random CAPTCHA text
  const generateCaptchaText = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.toUpperCase();
  };

  // Draw CAPTCHA on canvas
  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas dimensions
    const width = 100;
    const height = 20;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e8eef7');
    gradient.addColorStop(1, '#f3f4f6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add noise/lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.3)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Add circles for extra noise
    for (let i = 0; i < 2; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.2)`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw text with distortion
    ctx.font = 'bold 10px Arial';
    ctx.fillStyle = '#1e3a8a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < text.length; i++) {
      const x = (i + 1) * (width / (text.length + 1));
      const y = height / 2 + (Math.random() - 0.5) * 4;
      const angle = (Math.random() - 0.5) * 0.2;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Add border
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  };

  // Initialize CAPTCHA on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const newText = generateCaptchaText();
      setCaptchaText(newText);
      drawCaptcha(newText);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleRefreshCaptcha = () => {
    const newText = generateCaptchaText();
    setCaptchaText(newText);
    setUserCaptchaInput('');
    drawCaptcha(newText);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate NetID
    if (!email) {
      setError('NetID is required');
      setIsLoading(false);
      return;
    }

    // Validate password
    if (!password) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    // Validate CAPTCHA
    if (!userCaptchaInput) {
      setError('Please enter the CAPTCHA text');
      setIsLoading(false);
      return;
    }

    if (userCaptchaInput.toUpperCase() !== captchaText) {
      setError('CAPTCHA text is incorrect');
      handleRefreshCaptcha();
      setIsLoading(false);
      return;
    }

    // Extract NetID (remove @srmist.edu.in if present)
    const netId = email.split('@')[0].toLowerCase();

    // Validate credentials (NetID is "student")
    if (netId === 'student' && password === DEFAULT_PASSWORD) {
      // Simulate login delay
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', `${netId}@srmist.edu.in`);
        router.push('/');
      }, 500);
    } else {
      setError('Invalid NetID or password');
      handleRefreshCaptcha();
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
      {isChecking ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold">SRM</span>
            </div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Main Content - Single Responsive Container */}
          <div className="flex-1 overflow-hidden flex">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:overflow-y-auto overflow-hidden">
              {/* Left Section - Info Panel */}
              <div className="hidden lg:flex lg:w-1/2 h-full bg-gray-100 relative flex-col justify-start">
                <div className="absolute top-[0.125rem] left-8">
                  <Image 
                    src="/logos/srm-logo.png" 
                    alt="SRM Logo" 
                    width={200} 
                    height={200}
                    className="w-50 h-50"
                  />
                </div>
                <div className="w-full pt-56 px-8 pb-8">
                  <p className="text-blue-600 font-semibold mb-4">Placement & Recruitment Portal</p>
                  
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    Explore top companies recruiting at SRM IST. View hiring processes, skill requirements, department-wise placements, and InnoVX initiatives. Track your career opportunities and innovation projects.
                  </p>

                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🏢</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Company Profiles</h3>
                        <p className="text-sm text-slate-600">Detailed info on recruiting organizations</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📋</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Hiring Process</h3>
                        <p className="text-sm text-slate-600">Interview rounds and selection criteria</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🎯</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Skill Requirements</h3>
                        <p className="text-sm text-slate-600">Technical & soft skills by role</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200 border-l-4">
                    <p className="text-xs font-bold text-red-800 mb-2">⚠️ STUDENT ACCOUNT RESTRICTIONS</p>
                    <ul className="text-xs text-red-700 space-y-1">
                      <li>• Read-only access to company and placement data</li>
                      <li>• Unauthorized data export/download is logged</li>
                      <li>• Account misuse may result in suspension</li>
                      <li>• Any unauthorized access attempts will be reported</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-700">
                      <strong>Login with NetID:</strong> Use your SRM email ID before @srmist.edu.in
                    </p>
                    <p className="text-xs text-gray-500 mt-2">e.g., if your email is john@srmist.edu.in, your NetID is <code className="bg-gray-100 px-2 py-1 rounded">john</code></p>
                  </div>
                </div>
              </div>

              {/* Right Section - Login Card */}
              <div className="w-full lg:w-1/2 h-fit bg-gray-100 flex items-center justify-center py-4 px-3 sm:py-6 sm:px-6 lg:p-8">
                <div className="w-full max-w-[95%] sm:max-w-md bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200">
                  <div className="mb-3 sm:mb-4 text-center">
                    <div className="flex justify-center mb-0 lg:hidden">
                      <Image 
                        src="/logos/srm-logo.png" 
                        alt="SRM Logo" 
                        width={160} 
                        height={160}
                        className="w-32 h-20"
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Sign In</h3>
                  </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  )}

                  {/* NetID Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Student Portal NetID
                    </label>
                    <input
                      type="text"
                      value={email.split('@')[0]}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your NetID"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Part of your email before @srmist.edu.in</p>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* CAPTCHA Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Verify CAPTCHA
                    </label>
                    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 mb-3">
                      <canvas
                        ref={canvasRef}
                        className="w-full border border-gray-300 rounded bg-white"
                        style={{ maxWidth: '100%', height: 'auto', minHeight: '25px', display: 'block' }}
                      />
                    </div>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={userCaptchaInput}
                        onChange={(e) => setUserCaptchaInput(e.target.value)}
                        placeholder="Enter text from image"
                        maxLength={6}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all uppercase text-sm text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={handleRefreshCaptcha}
                        className="px-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Refresh CAPTCHA"
                      >
                        <RefreshCw className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>

                  {/* Forgot Password Link */}
                  <div className="text-center">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Forgot Password?
                    </a>
                  </div>
                </form>

              </div>
            </div>
            </div>
          </div>

          {/* Footer with Demo Credentials */}
          <div className="bg-gray-900 text-white py-6 px-4 text-center space-y-2">
            <div className="text-xs text-gray-400 mb-2">
              <p className="font-semibold">Demo Credentials</p>
              <p><span className="text-gray-300">NetID:</span> student | <span className="text-gray-300">Password:</span> password123</p>
            </div>
            <p className="text-xs text-gray-500">© 2026 SRM Institute of Science & Technology. All Rights Reserved.</p>
          </div>
        </>
      )}
    </div>
  );
}

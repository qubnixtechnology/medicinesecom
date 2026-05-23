

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function AccountPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  
  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      try {
        const parsed = JSON.parse(token);
        if (parsed.state?.token) {
          router.push('/');
        }
      } catch (e) {}
    }
  }, [router]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.auth.login(loginEmail, loginPassword);
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Store auth data
        const authData = {
          state: {
            user: data.data.user,
            token: data.data.token,
            isAuthenticated: true
          },
          version: 0
        };
        localStorage.setItem('auth-storage', JSON.stringify(authData));
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
    
  //   if (registerPassword.length < 6) {
  //     setError('Password must be at least 6 characters');
  //     setLoading(false);
  //     return;
  //   }
    
  //   try {
  //     const response = await fetch('/api/auth/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         name: registerName,
  //         email: registerEmail,
  //         password: registerPassword,
  //         phone: registerPhone,
  //         role: 'customer'
  //       })
  //     });
      
  //     const data = await response.json();
      
  //     if (response.ok && data.success) {
  //       // Store auth data
  //       const authData = {
  //         state: {
  //           user: data.data.user,
  //           token: data.data.token,
  //           isAuthenticated: true
  //         },
  //         version: 0
  //       };
  //       localStorage.setItem('auth-storage', JSON.stringify(authData));
  //       setSuccess('Registration successful! Redirecting...');
  //       setTimeout(() => {
  //         window.location.href = '/';
  //       }, 1500);
  //     } else {
  //       setError(data.message || 'Registration failed');
  //     }
  //   } catch (err) {
  //     setError('Network error. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');
  
  if (registerPassword.length < 6) {
    setError('Password must be at least 6 characters');
    setLoading(false);
    return;
  }
  
  try {
    const response = await api.auth.register({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      phone: registerPhone,
      role: 'customer'
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // Store auth data
      const authData = {
        state: {
          user: data.data.user,
          token: data.data.token,
          isAuthenticated: true
        },
        version: 0
      };
      localStorage.setItem('auth-storage', JSON.stringify(authData));
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      // Show specific error message
      if (data.message === 'Email already registered') {
        setError('This email is already registered. Please login instead or use a different email.');
      } else {
        setError(data.message || 'Registration failed');
      }
    }
  } catch (err) {
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">My Account</h1>
        <p className="text-center text-gray-600 mb-8">
          {isLogin ? 'Login to access your account' : 'Create a new account'}
        </p>
        
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Sign Up
          </button>
        </div>
        
        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} action="#" className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@glance.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Password *</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-blue-300"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
            </div>
          </form>
        ) : (
          // Register Form
          <form onSubmit={handleRegister} action="#" className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="9876543210"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Password *</label>
              <input
                type="password"
                required
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min 6 characters"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-green-300"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
        
        <div className="text-center mt-6 text-sm text-gray-500">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline">
                Create New Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline">
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

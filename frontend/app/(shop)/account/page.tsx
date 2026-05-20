// 'use client';

// import Link from 'next/link';
// import { User, Package, Heart, LogOut, Settings, ShoppingBag } from 'lucide-react';

// export default function AccountPage() {
//   const isLoggedIn = false; 
  
//   if (!isLoggedIn) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
//           <div className="text-center mb-8">
//             <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
//               <User size={40} className="text-blue-600" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
//             <p className="text-gray-600 mt-2">Login or sign up to access your account</p>
//           </div>
          
//           <form className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Login
//             </button>
//           </form>
          
//           <div className="mt-4 text-center">
//             <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//               Forgot Password?
//             </Link>
//           </div>
          
//           <div className="mt-6 pt-6 border-t text-center">
//             <p className="text-sm text-gray-600">Don't have an account?</p>
//             <Link
//               href="/signup"
//               className="text-blue-600 hover:underline text-sm font-medium"
//             >
//               Create New Account
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Sidebar */}
//         <div className="md:col-span-1">
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="text-center mb-4">
//               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
//                 <User size={32} className="text-blue-600" />
//               </div>
//               <h3 className="font-semibold mt-2">John Doe</h3>
//               <p className="text-sm text-gray-500">john@example.com</p>
//             </div>
            
//             <div className="border-t pt-4 space-y-2">
//               <Link href="/account" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
//                 <User size={18} /> Dashboard
//               </Link>
//               <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
//                 <Package size={18} /> Orders
//               </Link>
//               <Link href="/wishlist" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
//                 <Heart size={18} /> Wishlist
//               </Link>
//               <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
//                 <Settings size={18} /> Settings
//               </Link>
//               <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <div className="md:col-span-3">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-bold mb-4">Welcome Back!</h2>
//             <p className="text-gray-600">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//               <div className="border rounded-lg p-4">
//                 <h3 className="font-semibold mb-2">Recent Orders</h3>
//                 <p className="text-sm text-gray-500">You have no recent orders.</p>
//                 <Link href="/products" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
//                   Shop Now →
//                 </Link>
//               </div>
//               <div className="border rounded-lg p-4">
//                 <h3 className="font-semibold mb-2">Account Details</h3>
//                 <p className="text-sm text-gray-500">Manage your account information.</p>
//                 <Link href="/settings" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
//                   Edit Profile →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
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
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        phone: registerPhone,
        role: 'customer'
      })
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

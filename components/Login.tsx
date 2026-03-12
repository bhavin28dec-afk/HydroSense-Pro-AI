
import React, { useState, useEffect } from 'react';
import { UserRole, UserAccount } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Initialize default user if storage is empty (First run)
  useEffect(() => {
    const storedUsers = localStorage.getItem('hydro_users');
    if (!storedUsers) {
      const defaultUser: UserAccount = {
        username: 'user',
        password: 'Bhushan@Sawarkar',
        createdDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };
      localStorage.setItem('hydro_users', JSON.stringify([defaultUser]));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Admin Login (Hardcoded)
    if (username === 'admin' && password === '9325445135') {
      onLogin('admin');
      return;
    }

    // 2. User Login (Dynamic List)
    const storedUsersRaw = localStorage.getItem('hydro_users');
    const users: UserAccount[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

    const foundUser = users.find(u => u.username === username);

    if (foundUser) {
      if (foundUser.password === password) {
        // Check Active Status
        if (foundUser.isActive === false) {
          setError('Account Deactivated. Please contact Admin.');
          return;
        }

        // Check Validity
        const now = new Date();
        const expiry = new Date(foundUser.expiryDate);

        if (now > expiry) {
          setError('Account Expired. Validity over. Please contact Admin.');
        } else {
          onLogin('user');
        }
      } else {
        setError('Invalid Password');
      }
    } else {
      setError('User ID not found');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full flex flex-col md:flex-row">
        <div className="p-8 w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              🌿
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">HydroSense AI</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Professional Hydroponic System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Login ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="Enter ID"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold px-4 py-3 rounded-xl flex items-center">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              Protected System • Authorized Personnel Only
            </p>
            <p className="text-xs text-slate-600 font-bold mt-2">
              Contact: Bhushan Sawarkar | Mob: 8275293246
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

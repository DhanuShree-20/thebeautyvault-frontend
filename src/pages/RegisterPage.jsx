import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// 1. IMPORT the Firebase Auth function
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
// 2. IMPORT your auth configuration (ensure the path is correct)
import { auth } from '../config/firebase'; 
import { UserPlus, Mail, Lock, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Now 'createUserWithEmailAndPassword' and 'auth' are defined!
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      alert("Registration Successful!");
      navigate('/');
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <UserPlus className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900">Create Account</h1>
          <p className="text-gray-500 font-medium mt-2">Join ModernShop today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-100 disabled:bg-gray-400 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "SIGN UP"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 font-bold">
          Already have an account? <Link title="Login" to="/login" className="text-indigo-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
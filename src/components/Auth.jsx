import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerWithEmail } from '../services/api';
import toast from 'react-hot-toast';

export default function Auth() {
    const [isLoginView, setIsLoginView] = useState(true);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Form states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [regFirstName, setRegFirstName] = useState('');
    const [regLastName, setRegLastName] = useState('');
    const [regDob, setRegDob] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(loginEmail, loginPassword);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userData = { firstName: regFirstName, lastName: regLastName, dateOfBirth: regDob, email: regEmail, password: regPassword };
            const res = await registerWithEmail(userData);
            toast.success(res.data.msg);
            navigate('/verify-email', { state: { email: regEmail } });
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Registration failed!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
                
                {/* --- Left Branding Panel --- */}
                <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-center text-white">
                    <h1 className="text-4xl font-extrabold mb-4">Welcome to Onimo AI</h1>
                    <p className="text-purple-200">
                        Unlock your potential with the power of AI. Get instant answers, generate code, and bring your creative ideas to life.
                    </p>
                </div>

                {/* --- Right Form Panel --- */}
                <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        {isLoginView ? 'Please enter your details to sign in.' : 'Let\'s get you started.'}
                    </p>

                    {/* Tab buttons */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                        <button 
                            onClick={() => setIsLoginView(true)} 
                            className={`py-2 px-4 w-1/2 text-center font-semibold transition-colors duration-300 ${isLoginView ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'}`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setIsLoginView(false)} 
                            className={`py-2 px-4 w-1/2 text-center font-semibold transition-colors duration-300 ${!isLoginView ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'}`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Login Form */}
                    <div className={isLoginView ? 'block' : 'hidden'}>
                        <form onSubmit={handleLogin}>
                            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email Address" className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600" required />
                            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-6 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600" required />
                            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Sign In</button>
                        </form>
                    </div>

                    {/* Register Form */}
                    <div className={!isLoginView ? 'block' : 'hidden'}>
                        <form onSubmit={handleRegister}>
                            <div className="flex gap-4 mb-4">
                               <input type="text" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)} placeholder="First Name" className="w-1/2 p-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600" required/>
                               <input type="text" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} placeholder="Last Name" className="w-1/2 p-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600" required/>
                            </div>
                            <input type="date" value={regDob} onChange={(e) => setRegDob(e.target.value)} className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg text-gray-500 dark:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600" required />
                            <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email Address" className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600" required />
                            <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600" required />
                            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors">Create Account</button>
                        </form>
                    </div>
                    
                    {/* Google Login Button */}
                    <div className="mt-6 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-gray-600"></div></div>
                            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">OR</span></div>
                        </div>
                        <a 
                            href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`} 
                            className="mt-4 inline-flex items-center justify-center w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-5 h-5 mr-3" />
                            Continue with Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
    const { isAuthenticated } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-6">
                        <Link to="/">
                            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V5m0 14v-1m6-6h1M5 12H4M8 8l1-1m6 0l1 1M8 16l1 1m6 0l-1 1" />
                            </svg>
                        </Link>
                        <div className="hidden md:flex items-baseline space-x-4">
                            <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                                <i className="fas fa-home"></i>
                                <span>Home</span>
                            </NavLink>
                            <NavLink to="/chat" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                                <i className="fas fa-comment-dots"></i>
                                <span>Chat</span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
                        </button>
                        
                        {!isAuthenticated && (
                             <div className="hidden md:flex items-center space-x-2">
                                <Link to="/login" className="text-gray-500 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link to="/login" className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
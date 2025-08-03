import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import Chat from './components/Chat';
import EmailVerify from './components/EmailVerify';
import GoogleCallback from './components/GoogleCallback';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);
    if (loading) {
        return <div>Loading...</div>; 
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function LoginPage() {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <Navigate to="/chat" /> : <Auth />;
}

export default function AppContent() {
    const location = useLocation();

    const showNavAndFooter = location.pathname !== '/chat';

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
            {showNavAndFooter && <Navbar />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/verify-email" element={<EmailVerify />} />
                    <Route path="/auth/google/callback" element={<GoogleCallback />} />
                    <Route
                        path="/chat"
                        element={
                            <PrivateRoute>
                                <Chat />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </main>
            
            {showNavAndFooter && <Footer />}

            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}
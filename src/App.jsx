import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // ThemeProvider ইম্পোর্ট করুন
import AppContent from './AppContent'; // আমরা মূল কন্টেন্ট একটি নতুন ফাইলে নিচ্ছি

function App() {
    return (
        <Router>
            <AuthProvider>
                <ThemeProvider> {/* AuthProvider-কে ThemeProvider দিয়ে র‍্যাপ করুন */}
                    <AppContent />
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
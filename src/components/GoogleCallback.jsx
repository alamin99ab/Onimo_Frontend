// src/components/GoogleCallback.jsx

import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function GoogleCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithToken } = useContext(AuthContext);

    useEffect(() => {
        // URL থেকে 'token' প্যারামিটারটি খোঁজা হচ্ছে
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // যদি টোকেন পাওয়া যায়, তাহলে সেই টোকেন দিয়ে লগইন করা হচ্ছে
            loginWithToken(token);
            // ব্যবহারকারীকে চ্যাট পেজে পাঠিয়ে দেওয়া হচ্ছে
            navigate('/chat');
        } else {
            // যদি কোনো কারণে টোকেন না পাওয়া যায়, তাহলে লগইন পেজে ফেরত পাঠানো হচ্ছে
            toast.error('Google login failed. Please try again.');
            navigate('/login');
        }
    }, [location, navigate, loginWithToken]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-lg font-medium">Authenticating with Google, please wait...</p>
        </div>
    );
}
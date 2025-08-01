import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function GoogleCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithToken } = useContext(AuthContext);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            loginWithToken(token);
            navigate('/chat');
        } else {
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
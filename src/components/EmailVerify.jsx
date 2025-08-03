import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/api';
import toast from 'react-hot-toast';

export default function EmailVerify() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState(location.state?.email || '');
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await verifyEmail({ email, code });
            toast.success(res.data.msg);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.msg || "Verification failed!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Verify Your Email</h2>
                <p className="text-center text-gray-600 mb-6">A verification code has been sent to your email. Please enter it below.</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="আপনার ইমেইল" 
                        className="w-full p-2 mb-4 border rounded" 
                        required 
                    />
                    <input 
                        type="text" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                        placeholder="ভেরিফিকেশন কোড" 
                        className="w-full p-2 mb-4 border rounded" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'ভেরিফাই করুন'}
                    </button>
                </form>
            </div>
        </div>
    );
}
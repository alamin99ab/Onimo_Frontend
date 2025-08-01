import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import { loginWithEmail } from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUserAndToken = useCallback((newToken) => {
        if (newToken) {
            localStorage.setItem('authToken', newToken);
            try {
                const decodedUser = jwtDecode(newToken);
                setUser(decodedUser.user);
                setToken(newToken);
            } catch (error) {
                localStorage.removeItem('authToken');
                setUser(null);
                setToken(null);
            }
        } else {
            localStorage.removeItem('authToken');
            setUser(null);
            setToken(null);
        }
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            if (decoded.exp * 1000 > Date.now()) {
                updateUserAndToken(storedToken);
            } else {
                updateUserAndToken(null);
            }
        }
        setLoading(false);
    }, [updateUserAndToken]);

    const login = async (email, password) => {
        const response = await loginWithEmail({ email, password });
        updateUserAndToken(response.data.token);
        toast.success('Successfully logged in!');
    };

    const logout = () => {
        updateUserAndToken(null);
        toast('Logged out successfully.', { icon: '👋' });
    };

    const loginWithToken = (tokenFromGoogle) => {
        updateUserAndToken(tokenFromGoogle);
        toast.success('Successfully logged in with Google!');
    };

    const value = { token, user, loading, login, logout, loginWithToken, isAuthenticated: !!token };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
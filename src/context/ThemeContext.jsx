import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // ব্রাউজারের localStorage থেকে আগের থিম লোড করা হচ্ছে, ডিফল্ট 'light'
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        
        root.classList.remove('light', 'dark'); // আগের ক্লাস মুছে ফেলা হচ্ছে
        root.classList.add(theme); // নতুন থিম ক্লাস যোগ করা হচ্ছে
        
        localStorage.setItem('theme', theme); // বর্তমান থিম localStorage-এ সেভ করা হচ্ছে
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
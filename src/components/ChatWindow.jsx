import React, { useState, useEffect, useRef } from 'react';
import { getHistory, sendMessage } from '../services/api';
import Message from './Message';
import toast from 'react-hot-toast';

export default function ChatWindow({ conversationId, setConversationId, refreshConversations, toggleSidebar }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('onimo');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const fetchHistory = async () => {
            if (conversationId) {
                setIsLoading(true);
                try {
                    const res = await getHistory(conversationId);
                    setMessages(res.data);
                } catch (error) {
                    toast.error("Failed to load conversation history.");
                    setMessages([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setMessages([{ sender: 'bot', text: 'আমি অনমো, আপনার পার্সোনাল AI অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' }]);
            }
        };
        fetchHistory();
    }, [conversationId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const userMessage = { sender: 'user', text: input };
        const currentInput = input;
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        setInput('');
        setIsLoading(true);

        try {
            const historyForApi = currentMessages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));
            const res = await sendMessage({ question: currentInput, mode, conversationId, history: historyForApi });
            const botMessage = { sender: 'bot', text: res.data.answer };
            setMessages(prev => [...prev, botMessage]);
            if (!conversationId && res.data.conversationId) {
                setConversationId(res.data.conversationId);
                refreshConversations();
            }
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Sorry, an error occurred.';
            toast.error(errorMsg);
            setMessages(prev => [...prev, { sender: 'bot', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full w-full max-w-4xl mx-auto">
            <div className="p-3 flex justify-between items-center bg-gray-100 dark:bg-gray-900">
                 <div className="flex items-center">
                    <button onClick={toggleSidebar} className="mr-4 md:hidden text-gray-700 dark:text-gray-200">
                        <i className="fas fa-bars"></i>
                    </button>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {conversationId ? "Continue Conversation" : "New Chat"}
                    </h3>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <Message key={index} sender={msg.sender} text={msg.text} />
                    ))}
                    {isLoading && <Message sender="bot" text="..." />}
                    <div ref={chatEndRef} />
                </div>
            </div>

            <div className="p-4 w-full">
                <form onSubmit={handleSendMessage} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Onimo anything..."
                        className="w-full p-4 pr-14 bg-gray-200 dark:bg-gray-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!input.trim() || isLoading}
                    >
                        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-arrow-up"></i>}
                    </button>
                </form>
            </div>
        </div>
    );
}
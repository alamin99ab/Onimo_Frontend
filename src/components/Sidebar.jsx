import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { deleteConversation } from '../services/api';
import toast from 'react-hot-toast';

export default function Sidebar({ conversations, isLoading, onNewChat, onSelectConversation, selectedConversationId, refreshConversations, isSidebarOpen, setIsSidebarOpen }) {
    const { logout } = useContext(AuthContext);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this conversation?')) {
            try {
                await deleteConversation(id);
                toast.success('Conversation deleted.');
                refreshConversations();
                if (selectedConversationId === id) {
                    onNewChat();
                }
            } catch (error) {
                toast.error('Failed to delete conversation.');
            }
        }
    };

    return (
        <>

            <div 
                className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 p-4 flex flex-col border-r dark:border-gray-700 shadow-lg z-40 transform transition-transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button onClick={onNewChat} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold p-2 rounded mb-4 hover:scale-105 transform transition-transform flex items-center justify-center">
                    <i className="fas fa-plus mr-2"></i> New Chat
                </button>
                <div className="flex-grow overflow-y-auto pr-2">
                    {isLoading ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
                    ) : (
                        conversations.map(conv => (
                            <div
                                key={conv._id}
                                onClick={() => onSelectConversation(conv._id)}
                                className={`p-2 my-1 rounded cursor-pointer flex justify-between items-center text-sm transition-colors ${selectedConversationId === conv._id ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            >
                                <span className="truncate">{conv.title}</span>
                                <button onClick={(e) => handleDelete(e, conv._id)} className="ml-2 text-gray-400 hover:text-red-500">
                                   <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <button onClick={logout} className="w-full bg-gray-800 text-white p-2 rounded mt-4 hover:bg-gray-900 flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600">
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
            </div>
        </>
    );
}
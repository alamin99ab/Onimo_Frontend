import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { getConversations } from '../services/api';
import toast from 'react-hot-toast';

export default function Chat() {
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchConversations = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await getConversations();
            setConversations(res.data);
        } catch (error) {
            toast.error('Could not fetch conversations.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations]);

    const handleNewChat = () => {
        setCurrentConversationId(null);
        setIsSidebarOpen(false);
    };

    const handleSelectConversation = (id) => {
        setCurrentConversationId(id);
        setIsSidebarOpen(false);
    };

    return (
        <div className="relative flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Sidebar
                conversations={conversations}
                isLoading={isLoading}
                onNewChat={handleNewChat}
                onSelectConversation={handleSelectConversation}
                selectedConversationId={currentConversationId}
                refreshConversations={fetchConversations}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="flex-1 flex flex-col items-center w-full h-full">
                <ChatWindow
                    conversationId={currentConversationId}
                    setConversationId={setCurrentConversationId}
                    refreshConversations={fetchConversations}
                    toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                />
            </div>
        </div>
    );
}
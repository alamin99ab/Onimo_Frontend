import React from 'react';
import { marked } from 'marked';
import CodeBlock from './CodeBlock';

const parseMessageContent = (text) => {
    if (!text) return [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]+?)\n```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
        }
        parts.push({ type: 'code', language: match[1] || 'plaintext', content: match[2].trim() });
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.substring(lastIndex) });
    }
    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
};


export default function Message({ sender, text }) {
    const isUser = sender === 'user';
    const contentParts = parseMessageContent(text);

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl lg:max-w-3xl rounded-lg shadow-sm ${isUser ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}>
                {contentParts.map((part, index) => {
                    if (part.type === 'code') {
                        return <CodeBlock key={index} language={part.language} code={part.content} />;
                    }
                    const htmlContent = marked.parse(part.content, { breaks: true });
                    return <div key={index} className="prose prose-sm max-w-none p-4 dark:prose-invert prose-p:text-inherit prose-strong:text-inherit" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
                })}
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import toast from 'react-hot-toast';

export default function CodeBlock({ language, code }) {
    const [isCopied, setIsCopied] = useState(false);

    let highlightedCode;
    try {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        highlightedCode = hljs.highlight(code, { language: validLanguage }).value;
    } catch (error) {
        console.error("Highlighting error:", error);
        highlightedCode = code; 
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied to clipboard!');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-[#282c34] rounded-lg my-4 overflow-hidden shadow-lg">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-gray-300 text-xs font-sans">
                <span>{language}</span>
                <button onClick={handleCopy} className="flex items-center gap-2 text-xs hover:text-white transition-colors">
                    {isCopied ? (
                        <>
                            <i className="fas fa-check"></i>
                            Copied!
                        </>
                    ) : (
                        <>
                            <i className="far fa-copy"></i>
                            Copy code
                        </>
                    )}
                </button>
            </div>
            <pre className="m-0 p-4 text-sm overflow-x-auto">
                <code
                    className={`language-${language}`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
            </pre>
        </div>
    );
}
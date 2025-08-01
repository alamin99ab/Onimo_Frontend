import React from 'react';

export default function LoadingIndicator() {
    return (
        <div className="flex w-full justify-start">
            <div className="max-w-xl lg:max-w-3xl w-full p-4 rounded-lg bg-gray-700">
                <div className="space-y-3">
                    <div className="h-4 bg-gray-600 rounded w-3/4 animate-shimmer"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2 animate-shimmer"></div>
                </div>
            </div>
        </div>
    );
}
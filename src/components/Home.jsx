import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30"></div>
            
            <section className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative flex flex-col justify-center items-center h-full">
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-44 animate-fade-in-up-bubble opacity-0 z-20">
                                <div className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-2xl relative">
                                    <p className="text-md font-semibold text-gray-800 dark:text-white text-center">Hey! I am Onimo.</p>
                                    <div className="absolute left-1/2 -ml-2 bottom-0 w-4 h-4 transform rotate-45 bg-white dark:bg-gray-700 -mb-2"></div>
                                </div>
                            </div>
                            <img 
                                src="https://i.postimg.cc/bJbjWRgj/hero-image.png"
                                alt="Onimo AI Robot"
                                className="w-full max-w-[18rem] drop-shadow-2xl z-10"
                            />
                            <div className="absolute bottom-10 w-48 h-8 bg-black/20 dark:bg-blue-500/20 rounded-full filter blur-xl"></div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                                Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Onimo AI</span>
                            </h1>
                            <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                                Your personal AI assistant, ready to answer any of your questions and help with various tasks.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link
                                    to="/chat"
                                    className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out inline-flex items-center justify-center animate-pulse-glow"
                                >
                                    Get Started
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </Link>
                                <Link
                                    to="#about-onimo"
                                    className="bg-transparent border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-900 transition-all duration-300"
                                >
                                    Explore More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about-onimo" className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">About Onimo</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                           Discover how Onimo can revolutionize your workflow and boost your creativity.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 text-white mx-auto text-2xl">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Instant Answers</h3>
                            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Get quick and accurate answers to your complex questions, powered by advanced AI models.</p>
                        </div>
                        <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-500 text-white mx-auto text-2xl">
                                <i className="fas fa-code"></i>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Code Generation</h3>
                            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Write, debug, and explain code in dozens of programming languages.</p>
                        </div>
                        <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-500 text-white mx-auto text-2xl">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Creative Ideas</h3>
                            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Brainstorm ideas, write content, and unlock your creativity for any project.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
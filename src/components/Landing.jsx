import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const LandingPage = () => {
    const [quote, setQuote] = useState('');
    const [saved, setSaved] = useState(false);
    const quoteRef = useRef(null);
    const buttonRef = useRef(null);

    // GSAP animation for quote display
    useEffect(() => {
        if (quote) {
            gsap.fromTo(
                quoteRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
            );
        }
    }, [quote]);

    // GSAP animation for button hover
    useEffect(() => {
        if (buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                { scale: 1 },
                { scale: 1.05, duration: 0.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }
            );
        }
    }, []);

    // Fetch random quote from backend API
    const fetchQuote = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/quotes');
            const data = await response.json();
            setQuote(data.quote);
            setSaved(false); // Reset save status when a new quote is fetched
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    // Save the quote to the database
    const saveQuote = async () => {
        if (!quote) return; // Do not save if there is no quote

        try {
            const userId = 'user123'; // Replace with dynamic user ID if needed
            const response = await fetch('http://localhost:5000/api/save-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quote, userId }),
            });
            const data = await response.json();
            if (data.message === 'Quote saved to favorites.') {
                setSaved(true); // Set save status to true
            }
        } catch (error) {
            console.error('Error saving quote:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center shadow-lg space-y-6 max-w-lg mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 animate-pulse">
                    Motivational Quote Generator
                </h1>

                {/* Quote Display */}
                <p
                    ref={quoteRef}
                    className={`text-xl italic font-light transition-opacity duration-500 ${
                        quote ? 'opacity-100' : 'opacity-50'
                    }`}
                >
                    {quote || 'Click below to get a motivational quote!'}
                </p>

                {/* Buttons */}
                <div className="flex flex-col space-y-4">
                    {/* Get Quote Button */}
                    <button
                        ref={buttonRef}
                        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 focus:outline-none"
                        onClick={fetchQuote}
                    >
                        Get Quote
                    </button>

                    {/* Save Quote Button */}
                    <button
                        className={`${
                            saved
                                ? 'bg-green-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-green-400'
                        } text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 focus:outline-none`}
                        onClick={saveQuote}
                        disabled={!quote || saved}
                    >
                        {saved ? 'Saved!' : 'Save Quote'}
                    </button>
                </div>

                {/* Link to view saved quotes */}
                <Link
                    to="/quote"
                    className="mt-4 text-blue-300 hover:text-blue-500 underline text-sm tracking-wide transition-all duration-200"
                >
                    View Saved Quotes
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;

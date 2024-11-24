import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const LandingPage = () => {
    const [quote, setQuote] = useState('');
    const [saved, setSaved] = useState(false);
    const quoteRef = useRef(null);

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
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="text-center space-y-4">
                {/* Header */}
                <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 animate-pulse">
                    Motivational Quote Generator
                </h1>

                {/* Quote Display */}
                <p
                    ref={quoteRef}
                    className={`text-xl italic transition duration-500 ${quote ? 'opacity-100' : 'opacity-50'
                        }`}
                >
                    {quote || 'Click below to get a motivational quote!'}
                </p>

                {/* Buttons */}
                <div className="space-y-4">
                    {/* Get Quote Button */}
                    <button
                        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                        onClick={fetchQuote}
                    >
                        Get Quote
                    </button>

                    {/* Save Quote Button */}
                    <button
                        className={`${saved ? 'bg-green-700' : 'bg-gradient-to-r from-green-500 to-green-400'
                            } text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300`}
                        onClick={saveQuote}
                        disabled={!quote || saved} // Disable if no quote or already saved
                    >
                        {saved ? 'Saved!' : 'Save Quote'}
                    </button>
                </div>

                {/* Link to view saved quotes */}
                <Link
                    to="/quote"
                    className="mt-4 inline-block text-blue-300 hover:text-blue-500 underline text-sm tracking-wide transition-all duration-200"
                >
                    View Saved Quotes
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;

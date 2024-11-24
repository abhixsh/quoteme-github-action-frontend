import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap'; // Correct import statement for GSAP

const QuotePage = () => {
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const quotesListRef = React.useRef(null);

  // Fetch saved quotes from the backend
  const fetchSavedQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/saved-quotes');
      if (!response.ok) {
        throw new Error('Failed to fetch saved quotes');
      }
      const data = await response.json();
      setSavedQuotes(data.quotes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // GSAP animation for the saved quotes list
  useEffect(() => {
    if (savedQuotes.length > 0) {
      gsap.fromTo(
        quotesListRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [savedQuotes]);

  // Run fetchSavedQuotes when the component mounts
  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white flex flex-col items-center p-6">
      {/* Header without GSAP animation */}
      <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
        Your Saved Quotes
      </h1>

      {loading ? (
        <div className="flex items-center justify-center">
          <p className="text-lg animate-pulse">Loading your quotes...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-lg text-red-500 font-semibold">{error}</p>
          <p className="mt-2">Please try refreshing the page.</p>
        </div>
      ) : savedQuotes.length === 0 ? (
        <p className="text-lg italic text-center">You have no saved quotes yet. Start saving your favorites!</p>
      ) : (
        <ul ref={quotesListRef} className="w-full max-w-3xl space-y-4">
          {savedQuotes.map((quote, index) => (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 flex items-start"
            >
              <span className="font-bold text-blue-400 mr-4">{index + 1}.</span>
              <p className="text-lg italic">"{quote}"</p>
            </li>
          ))}
        </ul>
      )}

      {/* Back to Home link without GSAP animation */}
      <Link
        to="/"
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default QuotePage;

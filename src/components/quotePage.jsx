import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaTrashAlt } from 'react-icons/fa'; // Import trash icon

const QuotePage = () => {
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const quotesListRef = React.useRef(null);
  const titleRef = React.useRef(null);

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

  // Delete a quote
  const handleDeleteQuote = async (quoteId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-favorite/${quoteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete quote');
      }
      setSavedQuotes((prevQuotes) => prevQuotes.filter((quote) => quote._id !== quoteId)); // Remove deleted quote from state
    } catch (error) {
      setError(error.message);
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

  // GSAP animation for the flowing gradient text effect on title
  useEffect(() => {
    gsap.to(titleRef.current, {
      backgroundPosition: '200% 50%',
      duration: 5,  // Duration of the flow (can be adjusted)
      ease: 'sine.inOut',  // Linear movement for a continuous flow
      repeat: -1,  // Repeat infinitely to keep it flowing
      backgroundImage: 'linear-gradient(45deg, #ff6ec7, #f7bb97, #1f90e6, #02aab0)',
      backgroundSize: '400% 400%',  // Stretch the gradient to allow for smooth flow
    });
  }, []);

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400 animate-pulse p-7">
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
              key={quote._id} // Use the _id from the backend for the key
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 flex items-start justify-between"
            >
              <div>
                <span className="font-bold text-blue-400 mr-4">{index + 1}.</span>
                <p className="text-lg italic">"{quote.quote}"</p>
              </div>
              <button
                onClick={() => handleDeleteQuote(quote._id)}
                className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full ml-4 flex items-center justify-center"
              >
                <FaTrashAlt className="text-lg" />
              </button>
            </li>
          ))}
        </ul>
      )}

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

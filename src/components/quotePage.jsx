import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const QuotePage = () => {
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  // Run fetchSavedQuotes when the component mounts
  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Your Saved Quotes</h1>
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
        <ul className="w-full max-w-3xl space-y-4">
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

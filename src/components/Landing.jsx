import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [quote, setQuote] = useState('');
  const [saved, setSaved] = useState(false);

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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Motivational Quote Generator</h1>
      
      {/* Display quote or prompt */}
      <p className="text-xl italic mb-6">
        {quote || 'Click below to get a motivational quote!'}
      </p>

      {/* Get Quote button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={fetchQuote}
      >
        Get Quote
      </button>

      {/* Save Quote button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={saveQuote}
        disabled={!quote || saved} // Disable if no quote or already saved
      >
        {saved ? 'Saved!' : 'Save Quote'}
      </button>

      {/* Link to view saved quotes */}
      <Link to="/quote" className="text-blue-400 hover:text-blue-600">
        View Saved Quotes
      </Link>
    </div>
  );
};

export default LandingPage;

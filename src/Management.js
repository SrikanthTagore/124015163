import React, { useState } from 'react';
import axios from 'axios';

function Management() {
  const [urls, setUrls] = useState('');
  const [mergedNumbers, setMergedNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchNumbers = async () => {
    if (!urls) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:8008/numbers?${urls}`);
      setMergedNumbers(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <div>
        <label htmlFor="urls">Enter URLs (comma-separated):</label>
        <input
          type="text"
          id="urls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
      </div>
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {isLoading && <p>Loading...</p>}
      {mergedNumbers.length > 0 && (
        <div>
          <h2>Merged Unique Numbers (Ascending Order):</h2>
          <ul>
            {mergedNumbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Management;
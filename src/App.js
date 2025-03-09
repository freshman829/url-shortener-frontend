import React, { useState } from 'react';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('https://17fostsrjb.execute-api.us-east-2.amazonaws.com/dev/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>🔗 URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ width: '400px', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Shorten
        </button>
      </form>

      {loading && <p>Generating short URL...</p>}
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}

export default App;

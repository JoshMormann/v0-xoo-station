import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setRecentSearches(prev => {
        const newSearches = [query.trim(), ...prev.filter(q => q !== query.trim())];
        return newSearches.slice(0, 5);
      });
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search videos, GIFs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <span className="recent-label">Recent Searches:</span>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="recent-tag"
              onClick={() => onSearch(search)}
            >
              {search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SourceTabs from './SourceTabs';
import PreviewGrid from './PreviewGrid';

const DiscoverySection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSource, setActiveSource] = useState('youtube');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Implement actual search functionality
    setSearchResults(Array(9).fill(null).map((_, i) => ({
      id: i,
      title: `Test Video ${i + 1}`,
      creator: 'Test Creator',
      thumbnail: null
    })));
  };

  return (
    <div className="discovery-section">
      <SearchBar onSearch={handleSearch} />
      <SourceTabs 
        activeSource={activeSource}
        onSourceChange={setActiveSource}
      />
      <PreviewGrid 
        items={searchResults}
        onItemClick={(item) => console.log('Item clicked:', item)}
      />
    </div>
  );
};

export default DiscoverySection; 
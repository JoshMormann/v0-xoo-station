import React from 'react';

const sources = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'giphy', label: 'GIPHY' },
  { id: 'vimeo', label: 'Vimeo' }
];

const SourceTabs = ({ activeSource, onSourceChange }) => {
  return (
    <div className="source-tabs">
      {sources.map(source => (
        <button
          key={source.id}
          className={`tab ${activeSource === source.id ? 'active' : ''}`}
          onClick={() => onSourceChange(source.id)}
        >
          {source.label}
        </button>
      ))}
    </div>
  );
};

export default SourceTabs; 
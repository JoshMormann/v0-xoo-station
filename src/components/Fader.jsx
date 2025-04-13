import React from 'react';

const Fader = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className="fader-container">
      <div className="fader-label">A</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="fader"
      />
      <div className="fader-label">B</div>
      <div className="fader-status">
        {value === 0 ? 'A' : value === 100 ? 'B' : 'MIX'}
      </div>
    </div>
  );
};

export default Fader; 
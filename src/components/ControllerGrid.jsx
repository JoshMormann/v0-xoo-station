import React from 'react';

const ControllerGrid = ({ onPadAssign }) => {
  const [pads, setPads] = React.useState(Array(64).fill(null));

  const handlePadClick = (index) => {
    const side = index < 32 ? 'A' : 'B';
    onPadAssign(index, null, side); // For now, we'll just assign the side
  };

  return (
    <div className="controller-grid">
      {pads.map((pad, index) => (
        <div
          key={index}
          className={`controller-pad ${pad ? 'controller-pad--assigned' : ''}`}
          onClick={() => handlePadClick(index)}
        >
          {pad && (
            <div className="controller-pad__thumbnail">
              <img src={pad.thumbnail} alt={pad.title} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ControllerGrid; 
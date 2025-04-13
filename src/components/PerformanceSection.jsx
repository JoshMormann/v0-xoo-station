import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import ControllerGrid from './ControllerGrid';
import Fader from './Fader';

const PerformanceSection = () => {
  const [faderValue, setFaderValue] = useState(50);
  const [activeVideoA, setActiveVideoA] = useState(null);
  const [activeVideoB, setActiveVideoB] = useState(null);

  const handleFaderChange = (value) => {
    setFaderValue(value);
  };

  return (
    <div className="performance-section">
      <div className="video-players">
        <VideoPlayer
          id="player-a"
          video={activeVideoA}
          percentage={100 - faderValue}
        />
        <VideoPlayer
          id="player-b"
          video={activeVideoB}
          percentage={faderValue}
        />
      </div>
      <Fader
        value={faderValue}
        onChange={handleFaderChange}
      />
      <ControllerGrid
        onPadAssign={(padId, video, side) => {
          if (side === 'A') {
            setActiveVideoA(video);
          } else {
            setActiveVideoB(video);
          }
        }}
      />
    </div>
  );
};

export default PerformanceSection; 
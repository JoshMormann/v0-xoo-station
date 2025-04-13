import React from 'react';
import '../styles/main.scss';

const TestComponent = () => {
  return (
    <div className="app-container">
      <div className="discovery-section">
        <h2>Discovery Section</h2>
        <div className="preview-grid">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="preview-thumbnail">
              <div className="preview-thumbnail__overlay">
                <div className="preview-thumbnail__title">Test Video {i + 1}</div>
                <div className="preview-thumbnail__creator">Test Creator</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="performance-section">
        <h2>Performance Section</h2>
        <div className="video-player">
          <div className="video-player__percentage">100%</div>
        </div>
        <div className="fader">
          <div className="fader__handle"></div>
        </div>
        <div className="controller-grid">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="button"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestComponent; 
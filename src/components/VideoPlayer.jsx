import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ id, video, percentage }) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: false,
        autoplay: true,
        loop: true,
        muted: true
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, []);

  React.useEffect(() => {
    if (playerRef.current && video) {
      playerRef.current.src(video);
    }
  }, [video]);

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        playsInline
      />
      <div className="video-player__percentage">
        {percentage}%
      </div>
    </div>
  );
};

export default VideoPlayer; 
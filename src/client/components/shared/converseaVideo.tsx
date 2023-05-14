import { FC } from 'react';

const ConverseaVideo: FC = () => {
  return (
    <div className="video-container">
      <div className="overlay-video"></div>
      <video autoPlay loop muted id="conversea-video">
        <source src="/assets/converseaVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default ConverseaVideo;

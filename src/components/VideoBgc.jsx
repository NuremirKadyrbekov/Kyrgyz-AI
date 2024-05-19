import React from 'react';
// import './VideoBackground.css'; // Подключаем файл стилей
import '../App.css'
import Bgc from '../assets/bgc.mp4'
const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={Bgc} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;

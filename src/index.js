import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Animate from './components/animate';
import Photo from './components/GeneratePhoto';
import UnsplashPhotos from './components/GeneratePhoto';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Animate/>
  </React.StrictMode>
);


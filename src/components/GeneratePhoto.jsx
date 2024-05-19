import React, { useState } from 'react';
import axios from 'axios';

function UnsplashPhotos(props) {
 
  // console.log(prompt)
  // let promt = transcript
  // const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);

  const searchPhotos = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?query=${props}&count=10&client_id=SS5c8ko3yV85nF66jthxFKjBzVZGZFNrbfyWgmF0Jiw`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
 
  };



  return (
    <div>
      <h1>Photo {props.name}</h1>
        <button onClick={searchPhotos}>Search</button>
      <div className="photos" >
        {photos.map((photo) => (
          <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />
        ))}
      </div>
    </div>
  );
}

export default UnsplashPhotos;

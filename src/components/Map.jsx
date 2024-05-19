import React from "react";

function Map() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Map</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10661.598850075789!2d78.39719854287287!3d42.481729766849924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1715510511699!5m2!1sru!2skg"
        width="600"
        height="450"
        style={{border:0}}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className='Map'
      ></iframe>
    </div>
  );
}

export default Map;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import banner1 from '../assets/images/bannerImages/banner-1.webp';
import banner2 from '../assets/images/bannerImages/banner-2.webp';

function Banner() {
  const [src, setSrc] = useState(banner1);

  return (
    <div className="banner">
      <button
        onClick={() => {
          setSrc(banner1);
          console.log(src);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <img src={src} alt="banner" className="banner-img" />
      <button
        onClick={() => {
          setSrc(banner2);
          console.log(src);
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}

export default Banner;

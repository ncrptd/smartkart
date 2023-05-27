import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import banner1 from '../assets/images/bannerImages/banner-1.webp';
import banner2 from '../assets/images/bannerImages/banner-2.webp';
import bannerM1 from '../assets/images/bannerImages/mobile/bannerM1.webp';
import bannerM2 from '../assets/images/bannerImages/mobile/bannerM2.webp';

function Banner() {
  const navigate = useNavigate();

  const [img1, setImg1] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      setImg1(!img1);
    }, 3000);
    return () => {
      clearInterval(id);
    };
  }, [img1]);

  return (
    <div>
      <div
        className="hidden md:block"
        onClick={() => {
          navigate('/productsList');
        }}
      >
        <img
          ref={ref}
          src={img1 ? banner1 : banner2}
          alt="banner"
          loading="eager"
        />
      </div>

      <div
        className="block md:hidden"
        onClick={() => {
          navigate('/productsList');
        }}
      >
        <img ref={ref} src={img1 ? bannerM1 : bannerM2} alt="banner" />
      </div>
    </div>
  );
}

export default Banner;

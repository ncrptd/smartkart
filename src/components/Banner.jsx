import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import banner1 from '../assets/images/bannerImages/banner-1.webp';
import banner2 from '../assets/images/bannerImages/banner-2.webp';
import bannerM1 from '../assets/images/bannerImages/mobile/bannerM1.webp';
import bannerM2 from '../assets/images/bannerImages/mobile/bannerM2.webp';

function Banner() {
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
    <div className=" ">
      <Link className="hidden md:block" to="/productslist">
        <img ref={ref} src={img1 ? banner1 : banner2} alt="banner" />
      </Link>

      <Link className="block md:hidden" to="/productslist">
        <img ref={ref} src={img1 ? bannerM1 : bannerM2} alt="banner" />
      </Link>
    </div>
  );
}

export default Banner;

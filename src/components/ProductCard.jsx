import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
function ProductCard({ title, price, imageUrl, rating }) {
  return (
    <div className=" shadow-xl rounded-t-xl text-center md:w-1/5 overflow-hidden flex flex-col justify-between px-2 pt-2">
      <div className="relative shadow-lg ">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-xl object-cover h-full"
        />
        <FontAwesomeIcon
          icon={faHeart}
          className="p-2 rounded-full text-white bg-pink-600 inline-block absolute top-5 right-5"
        />
        <p
          className="absolute bottom-0 left-0 py-1 px-2 bg-pink-600 text-white rounded-lg 
        "
        >
          <span className="mr-2">&#9733; {rating}</span>
        </p>
      </div>
      <div className="mt-4 pt-4 font-semibold">
        <p className="mb-4">{title}</p>
        <p className="mb-4">
          <span>&#8377;</span>
          {price}
        </p>
        <div>
          <button
            className="bg-pink-600 text-white
           py-1 px-4 w-full "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

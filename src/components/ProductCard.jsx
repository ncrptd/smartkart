import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
function ProductCard({ title, price, imageUrl, rating, id }) {
  return (
    <Link to={`/product/${id}`}>
      <div className=" shadow-xl rounded-t-xl text-center overflow-hidden flex flex-col justify-between px-2 py-2  md:w-1/5 text-lg md:text-sm">
        <div className="relative shadow-lg h-3/4 md:h-4/6 ">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-t-xl object-cover h-full w-full"
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
        <div className="mt-2 pt-4 font-semibold md:text-lg md:pt-0 md:mt-2 ">
          <p className="mb-2">{title}</p>
          <p className="mb-2">
            <span>&#8377;</span>
            {price}
          </p>
          <div>
            <button
              className="bg-pink-600 text-white
           py-1 px-4 w-full  "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

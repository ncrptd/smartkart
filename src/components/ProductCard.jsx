import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
function ProductCard({ title, price, imageUrl, rating, id }) {
  return (
    <div className=" shadow-lg rounded-t-xl text-center overflow-hidden flex flex-col justify-between px-2 py-2   text-lg md:text-sm md:w-1/5 hover:bg-slate-100 hover:shadow-xl">
      <div className="relative shadow-lg h-3/4 md:h-4/6 ">
        <Link to={`/productDetails/${id}`}>
          <img
            src={imageUrl}
            alt={title}
            className="rounded-t-xl object-cover h-full w-full"
          />
          <FontAwesomeIcon
            icon={faHeart}
            className="p-2 rounded-full text-white bg-slate-300 text-gray-700 inline-block absolute top-2 right-2"
          />
          <p
            className="absolute bottom-2 left-2 py-1 px-2 bg-pink-600 text-white rounded-lg 
        "
          >
            <span className="mr-2">&#9733; {rating}</span>
          </p>
        </Link>
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
  );
}

export default ProductCard;

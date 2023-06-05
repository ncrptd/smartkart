import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { title, price, imageUrl, rating, _id } = product;
  const isLoggedIn = localStorage.getItem('user');
  const {
    state,
    addToCartHandler,
    addToWishlistHandler,
    removeFromWishlistHandler,
  } = useData();
  const { cart, wishlist } = state;
  const inCart = cart?.some((product) => {
    return product._id === _id;
  });
  const inWishlist = wishlist.some((product) => product._id === _id);
  const location = useLocation();
  return (
    <div className=" shadow-lg rounded-t-xl text-center overflow-hidden flex flex-col justify-between p-2 text-lg md:text-sm md:w-1/5 hover:bg-slate-100 hover:shadow-xl w-full">
      <div
        className="relative shadow-lg h-96 md:h-64 w-full cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/productDetails/${_id}`);
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-xl object-cover h-full w-full"
          loading="lazy"
        />
        <Link
          to={!isLoggedIn ? '/login' : ''}
          state={{ from: location }}
          onClick={(e) => {
            e.stopPropagation();

            if (inWishlist) {
              removeFromWishlistHandler(product?._id);
            } else if (isLoggedIn) {
              addToWishlistHandler(product);
            }
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`p-2 rounded-full cursor-pointer inline-block absolute top-2 right-2 ${
              inWishlist
                ? 'bg-pink-500 text-white'
                : 'bg-slate-300 text-slate-600'
            }`}
          />
        </Link>
        <p
          className="absolute bottom-2 left-2 py-1 px-2 bg-pink-600 text-white rounded-lg 
        "
        >
          <span className="mr-2">&#9733; {rating}</span>
        </p>
      </div>

      <div className="mt-2 pt-4 font-semibold md:text-lg md:pt-0 md:mt-2 ">
        <p className="mb-2 ">{title}</p>
        <p className="mb-2">
          <span>&#8377;</span>
          {price}
        </p>
        <div>
          {inCart ? (
            <Link
              to="/cart"
              className="text-white
           py-1 px-4 block w-full bg-slate-600"
            >
              Go to Cart
            </Link>
          ) : (
            <Link
              to={!isLoggedIn ? '/login' : ''}
              state={{ from: location }}
              className="bg-pink-600 text-white
           py-1 px-4 block w-full"
              onClick={() => {
                addToCartHandler(product);
              }}
            >
              Add to Cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

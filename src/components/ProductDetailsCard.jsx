import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useData } from '../contexts/DataContext';
import { Link, useLocation } from 'react-router-dom';
import Loader from './Loader';
import { useAuth } from '../contexts/AuthContext';
export default function ProductDetailsCard({ product }) {
  const {
    state,
    addToCartHandler,
    addToWishlistHandler,
    removeFromWishlistHandler,
  } = useData();
  const { cart, wishlist } = state;
  const { state: authState } = useAuth();
  const { isLoggedIn } = authState;
  const inCart = cart?.some((item) => {
    return item._id === product?._id;
  });
  const inWishlist = wishlist.some((item) => item._id === product?._id);
  const location = useLocation();
  return product ? (
    <div className="shadow-xl rounded-xl  flex flex-col lg:w-2/4 lg:flex-row gap-6 p-4 h-full">
      <div className="relative shadow-lg  h-96 w-full">
        <img
          src={product?.imageUrl}
          alt={product?.title}
          className="rounded-xl object-cover h-full w-full"
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
          <span className="mr-2">&#9733; {product?.rating}</span>
        </p>
      </div>
      <div className=" flex flex-col justify-between p-2 space-y-2 lg:bg-slate-100 lg:px-2 lg:rounded-xl w-full ">
        <h1 className="font-bold text-4xl">{product?.title}</h1>
        <p className="font-bold text-pink-400">{product?.numReviews} reviews</p>
        <p className="mb-2 font-bold">
          <span>&#8377;</span>
          {product?.price}
        </p>

        <p className="font-semibold">
          Description:{' '}
          <span className="font-normal">{product?.description}</span>
        </p>
        <p className="font-semibold">
          Sizes:{' '}
          {product?.sizes.map((size) => (
            <span
              key={size}
              className="mr-2 last-of-type:mr-0 inline-block font-normal"
            >
              {size}
            </span>
          ))}
        </p>

        {inCart ? (
          <Link
            to="/cart"
            className="text-white
       py-1 px-4 block w-full bg-slate-600 text-center"
          >
            Go to Cart
          </Link>
        ) : (
          <Link
            to={isLoggedIn ? '' : '/login'}
            state={{ from: location }}
            className="bg-pink-600 text-white
       py-1 px-4 block w-full  text-center hover:bg-pink-500"
            onClick={() => {
              addToCartHandler(product);
            }}
          >
            Add to Cart
          </Link>
        )}
      </div>
    </div>
  ) : (
    <Loader />
  );
}

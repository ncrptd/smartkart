import { useData } from '../contexts/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
export default function WishlistCard({ product }) {
  const {
    state,
    addToCartHandler,
    addToWishlistHandler,
    removeFromWishlistHandler,
    incrementHandler,
    decrementHandler,
  } = useData();
  const { cart, wishlist } = state;
  const inWishlist = wishlist?.some(({ _id }) => product?._id === _id);
  const cartItem = cart?.find(({ _id }) => {
    return product._id === _id;
  });
  return (
    <div className=" shadow-2xl rounded-t-xl text-center overflow-hidden flex flex-col justify-between text-lg md:text-sm md:w-1/5 hover:bg-slate-100 hover:shadow-xl ">
      <div className="relative  h-3/4 md:h-4/6">
        <img
          src={product?.imageUrl}
          alt={product?.title}
          className="rounded-t-xl object-cover h-full w-full"
        />
        <div
          onClick={() =>
            inWishlist
              ? removeFromWishlistHandler(product?._id)
              : addToWishlistHandler(product)
          }
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`p-2 rounded-full cursor-pointer inline-block absolute top-2 right-2 ${
              inWishlist
                ? 'bg-pink-500 text-white'
                : 'bg-slate-300 text-slate-600'
            }`}
          />
        </div>
      </div>
      <div className="py-2 px-4 text-slate-700">
        <p className="font-semibold text-lg mb-2"> {product?.title}</p>
        <p className="font-bold text-2xl">&#8377; {product?.price}</p>
      </div>
      {cartItem ? (
        <div
          to=""
          className="text-white
            w-full bg-slate-600 flex justify-around text-lg font-bold p-2 md:p-1"
        >
          <button
            className="flex justify-center item-center font-bold"
            onClick={() => decrementHandler(cartItem)}
          >
            -
          </button>{' '}
          <p className=" flex justify-center items-center">{cartItem?.qty}</p>{' '}
          <button
            className="flex justify-center item-center"
            onClick={() => incrementHandler(cartItem)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="bg-pink-600 p-2 font-bold text-white"
          onClick={() => {
            addToCartHandler(product);
            removeFromWishlistHandler(product?._id);
          }}
        >
          Move To Cart
        </button>
      )}
    </div>
  );
}

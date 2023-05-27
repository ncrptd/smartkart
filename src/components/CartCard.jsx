import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
export default function CartCard({ product }) {
  let { imageUrl, title, price, qty, _id, original_price } = product;
  price = parseFloat(price);
  original_price = parseFloat(original_price);

  const discount = Number(
    ((original_price - price) / original_price) * 100
  ).toFixed(2);
  const {
    state,
    incrementHandler,
    decrementHandler,
    removeFromCart,
    addToWishlistHandler,
  } = useData();
  const { wishlist } = state;
  const inWishlist = wishlist.some((product) => product._id === _id);
  return (
    <div className="flex rounded-xl md:w-3/4 md:shadow-lg overflow-hidden mb-4 text-slate-600">
      <Link to={`/productDetails/${_id}`}>
        <div className="w-full h-full overflow-hidden">
          <img
            className="h-full w-full object-cover rounded-xl "
            src={imageUrl}
            alt={title}
          />
        </div>
      </Link>

      <div
        className="p-4 w-full text-base flex flex-col gap-4 justify-between 
        "
      >
        <div
          className="flex h-3/4 justify-between   flex-col md:text-base
        "
        >
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-2xl ">
            &#36;{price}{' '}
            <span className="font-thin text-lg line-through">
              {original_price}
            </span>
          </p>
          <p className="font-bold mt-2">{discount}% OFF</p>
          <div className="flex gap-4 items-center font-base">
            <p>Quantity</p>
            <div className="flex space-x-2 text-lg ">
              <button onClick={() => decrementHandler(product)}>-</button>{' '}
              <p className="border-2 rounded-full p-1">{qty}</p>{' '}
              <button onClick={() => incrementHandler(product)}>+</button>
            </div>
          </div>
        </div>
        <button
          className=" text-sm bg-pink-600
            w-full py-2  text-white font-bold 
            "
          onClick={() => removeFromCart(_id)}
        >
          Remove From Cart
        </button>
        {inWishlist ? (
          <Link
            to="/wishlist"
            className="bg-slate-600 p-2 font-bold text-white hover:bg-pink-500 text-center"
          >
            In Wishlist
          </Link>
        ) : (
          <button
            className=" text-sm bg-fuchsia-500
            w-full py-2  text-white font-bold 
            "
            onClick={() => {
              addToWishlistHandler(product);
              removeFromCart(_id);
            }}
          >
            Move To Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

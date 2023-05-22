import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
export default function CartCard({ product }) {
  let { imageUrl, title, price, qty, _id, original_price } = product;
  price = parseFloat(price);
  original_price = parseFloat(original_price);

  const discount = Number(
    ((original_price - price) / original_price) * 100
  ).toFixed(2);
  const { incrementHandler, decrementHandler, removeFromCart } = useData();

  return (
    <div className="flex rounded-xl md:w-3/4 md:shadow-lg overflow-hidden mb-4 text-slate-600">
      <Link to={`/productDetails/${_id}`}>
        <div className="w-full h-full">
          <img
            className="h-full w-full object-cover rounded-tl-xl  rounded-tr-xl "
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
              <button onClick={() => decrementHandler(_id)}>-</button>{' '}
              <p className="border-2 rounded-full p-1">{qty}</p>{' '}
              <button onClick={() => incrementHandler(_id)}>+</button>
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
      </div>
    </div>
  );
}

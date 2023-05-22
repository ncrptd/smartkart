import { Link } from 'react-router-dom';
import axios from 'axios';
import { useData, useDataDispatch } from '../contexts/DataContext';
import { ACTIONS } from '../reducer/dataReducer';
export default function CartCard({ product }) {
  let { imageUrl, title, price, qty, _id, original_price } = product;
  price = parseFloat(price);
  original_price = parseFloat(original_price);

  const discount = Number(
    ((original_price - price) / original_price) * 100
  ).toFixed(2);
  const dispatch = useDataDispatch();
  const { cart } = useData();

  const incrementHandler = async () => {
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { authorization: encodedToken } };
      const body = {
        action: {
          type: 'increment',
        },
      };
      const res = await axios.post(`/api/user/cart/${_id}`, body, config);
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: res.data.cart } });
    } catch (error) {
      console.log(error);
    }
  };
  const decrementHandler = async () => {
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { authorization: encodedToken } };
      const body = {
        action: {
          type: 'decrement',
        },
      };
      const res = await axios.post(`/api/user/cart/${_id}`, body, config);
      const decrementedCart = res.data.cart;
      const updatedCart = decrementedCart.filter((item) => item.qty >= 1);
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: updatedCart } });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = () => {
    const newCart = cart.filter((item) => item._id !== _id);
    console.log(newCart);
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: newCart } });
  };
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
              <button onClick={decrementHandler}>-</button>{' '}
              <p className="border-2 rounded-full p-1">{qty}</p>{' '}
              <button onClick={incrementHandler}>+</button>
            </div>
          </div>
        </div>
        <button
          className=" text-sm bg-pink-600
            w-full py-2  text-white font-bold 
            "
          onClick={removeFromCart}
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { ACTIONS } from '../reducer/dataReducer';
import { useData, useDataDispatch } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function ProductDetailsCard({ product }) {
  const {
    imageUrl,
    title,
    rating,
    numReviews,
    price,
    description,
    sizes,
    _id,
  } = product;
  const dispatch = useDataDispatch();
  const { cart } = useData();
  const { isLoggedIn } = useAuth();

  const itemFound = cart.some((product) => {
    return product._id === _id;
  });
  const addToCartHandler = async () => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const { encodedToken } = JSON.parse(user);
    try {
      const config = {
        headers: { authorization: encodedToken },
      };
      const data = { product };
      const res = await axios.post('/api/user/cart', data, config);
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: res.data.cart } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-xl rounded-xl  flex flex-col  border-2 border-gray-400 lg:w-2/4 lg:flex-row gap-6 p-4 h-full">
      <div className="relative shadow-lg  ">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-xl object-cover h-full w-full"
        />
        <FontAwesomeIcon
          icon={faHeart}
          className="p-2 rounded-full text-white bg-pink-600 inline-block absolute top-5 right-5"
        />
        <p
          className="absolute bottom-2 left-2 py-1 px-2 bg-pink-600 text-white rounded-lg 
        "
        >
          <span className="mr-2">&#9733; {rating}</span>
        </p>
      </div>
      <div className=" flex flex-col space-y-2 lg:bg-slate-100 lg:px-2 lg:rounded-xl">
        <h1 className="font-bold text-4xl">{title}</h1>
        <p className="">{numReviews} reviews</p>
        <p className="mb-2 font-semibold">
          <span>&#8377;</span>
          {price}
        </p>

        <p className="font-semibold">
          Description: <span className="font-normal">{description}</span>
        </p>
        <p className="font-semibold">
          Sizes:{' '}
          {sizes.map((size) => (
            <span
              key={size}
              className="mr-2 last-of-type:mr-0 inline-block font-normal"
            >
              {size}
            </span>
          ))}
        </p>

        {itemFound ? (
          <Link
            to="/cart"
            className="text-white
           py-1 px-4 block w-full bg-fuchsia-600 text-center"
          >
            Go to Cart
          </Link>
        ) : (
          <Link
            to={!isLoggedIn ? '/login' : ''}
            className="bg-pink-600 text-white
           py-1 px-4 block w-full  text-center"
            onClick={addToCartHandler}
          >
            Add to Cart
          </Link>
        )}
      </div>
    </div>
  );
}

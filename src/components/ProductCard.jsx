import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useData, useDataDispatch } from '../contexts/DataContext';
import { ACTIONS } from '../reducer/dataReducer';
function ProductCard({ product }) {
  const { title, price, imageUrl, rating, id } = product;
  const { isLoggedIn } = useAuth();
  const dispatch = useDataDispatch();
  const { cart } = useData();
  const itemFound = cart.some((product) => {
    return product.id === id;
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
    <div className=" shadow-lg rounded-t-xl text-center overflow-hidden flex flex-col justify-between p-2  text-lg md:text-sm md:w-1/5 hover:bg-slate-100 hover:shadow-xl ">
      <div className="relative shadow-lg h-3/4 md:h-4/6 ">
        <Link to={`/productDetails/${id}`}>
          <img
            src={imageUrl}
            alt={title}
            className="rounded-t-xl object-cover h-full w-full"
          />
          <div
          // onClick={() =>
          //   dispatch({ type: ACTIONS.AddTOWISHLIST, payload: id })
          // }
          >
            <FontAwesomeIcon
              icon={faHeart}
              className="p-2 rounded-full bg-slate-300 text-gray-700 inline-block absolute top-2 right-2"
            />
          </div>
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
          {itemFound ? (
            <Link
              to="/cart"
              className="text-white
           py-1 px-4 block w-full bg-fuchsia-600"
            >
              Go to Cart
            </Link>
          ) : (
            <Link
              to={!isLoggedIn ? '/login' : ''}
              className="bg-pink-600 text-white
           py-1 px-4 block w-full"
              onClick={addToCartHandler}
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

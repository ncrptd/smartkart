import { createContext, useContext, useEffect, useReducer } from 'react';
import dataReducer from '../reducer/dataReducer';
import axios from 'axios';
import { ACTIONS } from '../reducer/dataReducer';
import { initialState } from '../reducer/dataReducer';
const DataContext = createContext();
const DataDispatchContext = createContext();

export default function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const {
    products,
    categories,
    cart,
    wishlist,
    priceFilter,
    categoryFilter,
    ratingsFilter,
    sortBy,
  } = state;

  const getProductsData = async () => {
    try {
      const res = await axios.get('/api/products');
      dispatch({
        type: ACTIONS.INITIAL_LOAD,
        payload: { products: res.data.products },
      });
      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      dispatch({
        type: ACTIONS.INITIAL_LOAD,
        payload: { categories: res.data.categories },
      });
    } catch (error) {}
  };
  const getCart = async () => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const { encodedToken } = JSON.parse(user);
    const config = {
      headers: {
        authorization: encodedToken,
      },
    };
    const res = await axios.get('/api/user/cart', config);
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { cart: res.data.cart },
    });
  };
  useEffect(() => {
    getProductsData();
    getCategories();
    getCart();
  }, []);

  const addToCartHandler = async (product) => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const { encodedToken } = JSON.parse(user);
    try {
      const config = {
        headers: { authorization: encodedToken },
      };
      const body = { product };

      const res = await axios.post('/api/user/cart', body, config);

      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: res.data.cart } });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = async (_id) => {
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { authorization: encodedToken } };

      const res = await axios.delete(`/api/user/cart/${_id}`, config);
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: res.data.cart } });
    } catch (error) {
      console.log(error);
    }
  };
  const incrementHandler = async (_id) => {
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
  const decrementHandler = async (_id) => {
    const foundItem = cart.find((item) => item._id === _id);
    if (foundItem.qty === 1) {
      removeFromCart(_id);
    }
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
      dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: { cart: decrementedCart },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addToWishlistHandler = async (product) => {
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { authorization: encodedToken } };

      const body = { product };
      const res = await axios.post('/api/user/wishlist', body, config);
      dispatch({
        type: ACTIONS.ADD_TO_WISHLIST,
        payload: { wishlist: res.data.wishlist },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromWishlistHandler = async (_id) => {
    console.log(_id);
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: { authorization: encodedToken },
      };
      const res = await axios.delete(`/api/user/wishlist/${_id}`, config);
      dispatch({
        type: ACTIONS.ADD_TO_WISHLIST,
        payload: { wishlist: res.data.wishlist },
      });
    } catch (error) {}
  };
  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        priceFilter,
        categoryFilter,
        ratingsFilter,
        sortBy,
        getProductsData,
        addToCartHandler,
        incrementHandler,
        decrementHandler,
        removeFromCart,
        addToWishlistHandler,
        removeFromWishlistHandler,
      }}
    >
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
export const useDataDispatch = () => useContext(DataDispatchContext);

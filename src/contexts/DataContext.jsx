import { createContext, useContext, useEffect, useReducer } from 'react';
import dataReducer from '../reducer/dataReducer';
import axios from 'axios';
import { ACTIONS } from '../reducer/dataReducer';
import { initialState } from '../reducer/dataReducer';
import {
  addedToCart,
  removedFromCart,
  addedToWishlist,
  removedFromWishlist,
} from '../alerts/alerts';
const DataContext = createContext();
const DataDispatchContext = createContext();

export default function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getProductsData = async () => {
    try {
      const res = await axios.get('/api/products');
      dispatch({
        type: ACTIONS.INITIAL_LOAD,
        payload: { products: res.data.products },
      });
      dispatch({ type: ACTIONS.HOME_IS_LOADING });
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
    } catch (error) {
      console.log(error);
    }
  };
  const getCart = async () => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const { encodedToken } = JSON.parse(user);
    try {
      const config = {
        headers: { authorization: encodedToken },
      };

      const res = await axios.get('/api/user/cart', config);
      console.log(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductsData();
    getCategories();
    getCart();
  }, []);

  const addToCartHandler = async (product) => {
    const inCart = state.cart.some(({ _id }) => {
      return product?._id === _id;
    });
    if (inCart) return;
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
      addedToCart();
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
      removedFromCart();
    } catch (error) {
      console.log(error);
    }
  };
  const incrementHandler = async (product) => {
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { authorization: encodedToken } };
      const body = {
        action: {
          type: 'increment',
        },
      };
      const res = await axios.post(
        `/api/user/cart/${product?._id}`,
        body,
        config
      );
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: res.data.cart } });
    } catch (error) {
      console.log(error);
    }
  };
  const decrementHandler = async (product) => {
    if (product?.qty <= 1) {
      removeFromCart(product?._id);
    }
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { authorization: encodedToken } };
      const body = {
        action: {
          type: 'decrement',
        },
      };
      const res = await axios.post(
        `/api/user/cart/${product?._id}`,
        body,
        config
      );
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
    const inWishlist = state.wishlist.some((_id) => product._id === _id);
    if (inWishlist) return;
    try {
      const { encodedToken } = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { authorization: encodedToken } };

      const body = { product };
      const res = await axios.post('/api/user/wishlist', body, config);
      dispatch({
        type: ACTIONS.ADD_TO_WISHLIST,
        payload: { wishlist: res.data.wishlist },
      });
      addedToWishlist();
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromWishlistHandler = async (_id) => {
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
      removedFromWishlist();
    } catch (error) {}
  };
  const handleSearchInput = (e) => {
    dispatch({
      type: ACTIONS.SEARCH_INPUT,
      payload: { searchInput: e.target.value },
    });
  };

  return (
    <DataContext.Provider
      value={{
        state,
        addToCartHandler,
        removeFromCart,
        addToWishlistHandler,
        removeFromWishlistHandler,
        incrementHandler,
        decrementHandler,
        handleSearchInput,
        getCart,
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

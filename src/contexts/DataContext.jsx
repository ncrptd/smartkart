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
    wishList,
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
    console.log(res.data.cart);
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
      const data = { product };

      const res = await axios.post('/api/user/cart', data, config);

      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: res.data.cart } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        cart,
        wishList,
        priceFilter,
        categoryFilter,
        ratingsFilter,
        sortBy,
        addToCartHandler,
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

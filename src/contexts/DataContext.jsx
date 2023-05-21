import { createContext, useContext, useEffect, useReducer } from 'react';
import dataReducer from '../reducer/dataReducer';
import axios from 'axios';
import { ACTIONS } from '../reducer/dataReducer';
import { initialState } from '../reducer/dataReducer';
const DataContext = createContext();
const DataDispatchContext = createContext();

export default function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const getProductsData = async () => {
    try {
      const res = await axios.get('/api/products');
      dispatch({
        type: ACTIONS.INITIALLOAD,
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
        type: ACTIONS.INITIALLOAD,
        payload: { categories: res.data.categories },
      });
    } catch (error) {}
  };
  const getCart = async () => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const encodedToken = JSON.parse(user).encodedToken;
    try {
      const res = await axios.get('/api/user/cart', {
        headers: { authorization: encodedToken },
      });
      const cart = res.data.cart;
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { cart: cart } });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductsData();
    getCategories();
    getCart();
  }, []);

  return (
    <DataContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
export const useDataDispatch = () => useContext(DataDispatchContext);

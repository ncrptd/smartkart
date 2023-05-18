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
  useEffect(() => {
    getProductsData();
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

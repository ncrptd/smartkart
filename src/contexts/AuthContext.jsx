import React, { createContext, useContext, useEffect, useReducer } from 'react';
import authReducer, {
  ACTIONS_AUTH,
  initialAuthState,
} from '../reducer/authReducer';
import { addedAddress, removedAddress } from '../alerts/alerts';
const AuthContext = createContext();
const AuthDispatchContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const getUserDetails = () => {
    const data = localStorage.getItem('user');
    if (data) {
      const user = JSON.parse(data);
      dispatch({
        type: ACTIONS_AUTH.LOGIN_SUCCESS,
        payload: { userDetails: user.userDetails },
      });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  function handleNewAddress(address) {
    dispatch({ type: ACTIONS_AUTH.NEW_ADDRESS, payload: { address: address } });
    addedAddress();
  }
  function handleAddressEdit(address) {
    const updatedAddressList = state.addressList.map((item) =>
      item.id === address?.id ? address : item
    );
    dispatch({
      type: ACTIONS_AUTH.EDIT_ADDRESS,
      payload: { updatedAddressList },
    });
  }
  function handleAddressDelete(address) {
    const updatedAddressList = state.addressList.filter(
      (item) => item?.id !== address?.id
    );
    dispatch({
      type: ACTIONS_AUTH.DELETE_ADDRESS,
      payload: { updatedAddressList },
    });
    removedAddress();
  }
  return (
    <AuthContext.Provider
      value={{
        state,
        handleNewAddress,
        handleAddressEdit,
        handleAddressDelete,
      }}
    >
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

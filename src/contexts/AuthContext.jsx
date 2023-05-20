import React, { createContext, useContext, useEffect, useReducer } from 'react';
import authReducer, {
  ACTIONS_AUTH,
  initialAuthState,
} from '../reducer/authReducer';
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

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

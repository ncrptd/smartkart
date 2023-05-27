export const ACTIONS_AUTH = {
  GET_USER: 'get-user',
  LOGIN_SUCCESS: 'login-success',
  LOGIN_FAILURE: 'login-failure',
  LOGOUT: 'logout',
  ADDRESS_UPDATE: 'address-update',
};

export const initialAuthState = {
  userDetails: null,
  addressList: [],
  isLoggedIn: false,
  error: null,
};

export default function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS_AUTH.GET_USER: {
      return { ...state, userDetails: payload.userDetails };
    }
    case ACTIONS_AUTH.LOGIN_SUCCESS: {
      return {
        ...state,
        userDetails: payload.userDetails,
        isLoggedIn: true,
      };
    }
    case ACTIONS_AUTH.LOGIN_FAILURE: {
      return { ...state, error: payload };
    }
    case ACTIONS_AUTH.LOGOUT: {
      return { ...state, isLoggedIn: false, userDetails: null };
    }
    case ACTIONS_AUTH.ADDRESS_UPDATE: {
      return { ...state, addressList: payload.addressList };
    }
    default: {
      return state;
    }
  }
}

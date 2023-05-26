export const ACTIONS_AUTH = {
  GET_USER: 'get-user',
  LOGIN_SUCCESS: 'login-success',
  LOGIN_FAILURE: 'login-failure',
  LOGOUT: 'logout',
};

export const initialAuthState = {
  userDetails: null,
  addressList: [
    {
      address: '123 Main St',
      alternateMobile: 1234567890,
      city: 'Anytown',
      id: '123abc-456def-789ghi',
      mobile: 9876543210,
      name: 'John Doe',
      pincode: '12345',
      state: 'California',
    },
  ],
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
    default: {
      return state;
    }
  }
}

export const ACTIONS_AUTH = {
  GET_USER: 'get-user',
  LOGIN_SUCCESS: 'login-success',
  LOGIN_FAILURE: 'login-failure',
};

export const initialAuthState = {
  userDetails: null,
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
    default: {
      return state;
    }
  }
}

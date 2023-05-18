export const ACTIONS_AUTH = {
  //   LOGIN_REQUEST: null,
  LOGIN_SUCCESS: 'login-success',
  LOGIN_FAILURE: 'login-failure',
};

export const initialAuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

export default function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS_AUTH.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        encodedToken: payload.encodedToken,
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

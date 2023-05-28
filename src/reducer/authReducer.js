export const ACTIONS_AUTH = {
  GET_USER: 'get-user',
  LOGIN_SUCCESS: 'login-success',
  LOGIN_FAILURE: 'login-failure',
  LOGOUT: 'logout',
  FILL_EDIT_ADDRESS_FORM: 'fill-edit-address-form',
  SHOW_ADDRESS_FORM: 'show-address-form',
  NEW_ADDRESS: 'new-address',
  EDIT_ADDRESS: 'edit-address',
  DELETE_ADDRESS: 'delete-address',
};

export const initialAuthState = {
  userDetails: null,
  isLoggedIn: false,
  showAddressForm: false,
  editAddressForm: null,
  addressList: [],
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
    case ACTIONS_AUTH.SHOW_ADDRESS_FORM: {
      return { ...state, showAddressForm: payload.flag };
    }
    case ACTIONS_AUTH.FILL_EDIT_ADDRESS_FORM: {
      console.log('f', payload.form);
      return { ...state, editAddressForm: payload.form };
    }
    case ACTIONS_AUTH.NEW_ADDRESS: {
      return { ...state, addressList: [...state.addressList, payload.address] };
    }
    case ACTIONS_AUTH.EDIT_ADDRESS: {
      return { ...state, addressList: payload.updatedAddressList };
    }
    case ACTIONS_AUTH.DELETE_ADDRESS: {
      return { ...state, addressList: payload.updatedAddressList };
    }
    default: {
      return state;
    }
  }
}

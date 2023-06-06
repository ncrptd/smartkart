const DUMMY_ADDRESS = {
  name: 'Vicki McDermott',
  address: '8505 Christina Ridges',
  city: 'West Cooper',
  state: 'Arunachal Pradesh',
  country: 'India',
  pincode: '820598',
  mobile: 1293452481,
  alternateMobile: 4878794411,
  id: '2364c34d-7645-49cb-8b74-4bc5cb09711d',
};
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
  SELECT_ADDRESS: 'select-address',
  PLACE_ORDER: 'place-order',
};

export const initialAuthState = {
  userDetails: null,
  isLoggedIn: false,
  showAddressForm: false,
  editAddressForm: null,
  addressList: [DUMMY_ADDRESS],
  selectedAddressId: null,
  orderDetails: { items: [], totalPrice: null, id: null },
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
      return {
        ...state,
        isLoggedIn: false,
        userDetails: null,
        addressList: [DUMMY_ADDRESS],
      };
    }
    case ACTIONS_AUTH.SHOW_ADDRESS_FORM: {
      return { ...state, showAddressForm: payload.flag };
    }
    case ACTIONS_AUTH.FILL_EDIT_ADDRESS_FORM: {
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
    case ACTIONS_AUTH.PLACE_ORDER: {
      return {
        ...state,
        orderDetails: {
          items: payload.items,
          id: payload.id,
          totalPrice: payload.totalPrice,
        },
      };
    }
    case ACTIONS_AUTH.SELECT_ADDRESS: {
      return { ...state, selectedAddressId: payload.addressId };
    }

    default: {
      return state;
    }
  }
}

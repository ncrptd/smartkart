export const ACTIONS = {
  INITIAL_LOAD: 'initial-load',
  PRICEFILTER: 'price-filter',
  CATEGORYFILTER: 'category-filter',
  RATINGSFILTER: 'ratings-filter',
  SORTBY: 'sort-by',
  CLEARFILTERS: 'clear-filters',
  ADD_TO_CART: 'add-to-cart',
  CLEAR_CART: 'clear-cart',
  ADD_TO_WISHLIST: 'add-to-wishlist',
  SEARCH_INPUT: 'search-input',
};
export const initialState = {
  products: [],
  categories: [],
  cart: [],
  wishlist: [],
  priceFilter: 200,
  categoryFilter: { Men: false, Women: false },
  ratingsFilter: null,
  sortBy: null,
  searchInput: '',
};
export default function dataReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INITIAL_LOAD: {
      if (payload.products) {
        return {
          ...state,
          products: payload.products,
        };
      }
      if (payload.categories) {
        return { ...state, categories: payload.categories };
      }
      return state;
    }
    case ACTIONS.PRICEFILTER: {
      return { ...state, priceFilter: payload };
    }
    case ACTIONS.CATEGORYFILTER: {
      if (payload.category) {
        return {
          ...state,

          categoryFilter: {
            ...state.categoryFilter,
            [payload.category]: payload.checked,
          },
        };
      }
      return state;
    }
    case ACTIONS.RATINGSFILTER: {
      return { ...state, ratingsFilter: payload };
    }
    case ACTIONS.SORTBY: {
      return { ...state, sortBy: payload };
    }
    case ACTIONS.CLEARFILTERS: {
      return {
        ...state,
        priceFilter: 200,
        categoryFilter: { Men: false, Women: false },
        ratingsFilter: null,
        sortBy: null,
      };
    }

    case ACTIONS.ADD_TO_CART: {
      return { ...state, cart: payload.cart };
    }
    case ACTIONS.CLEAR_CART: {
      return { ...state, cart: [] };
    }
    case ACTIONS.ADD_TO_WISHLIST: {
      return { ...state, wishlist: payload.wishlist };
    }
    case ACTIONS.SEARCH_INPUT: {
      return {
        ...state,
        searchInput: payload.searchInput,
      };
    }
    default: {
      return state;
    }
  }
}

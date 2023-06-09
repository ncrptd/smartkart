export const ACTIONS = {
  INITIAL_LOAD: 'initial-load',
  PRICE_FILTER: 'price-filter',
  CATEGORY_FILTER: 'category-filter',
  RATINGS_FILTER: 'ratings-filter',
  SORTBY: 'sort-by',
  CLEAR_FILTERS: 'clear-filters',
  ADD_TO_CART: 'add-to-cart',
  CLEAR_CART: 'clear-cart',
  ADD_TO_WISHLIST: 'add-to-wishlist',
  CLEAR_WISHLIST: 'clear-wishlist',
  SEARCH_INPUT: 'search-input',
  HOME_IS_LOADING: 'home-is-loading',
};
export const initialState = {
  products: [],
  categories: [],
  cart: [],
  wishlist: [],
  priceFilter: 4000,
  categoryFilter: { Men: false, Women: false },
  ratingsFilter: null,
  sortBy: null,
  searchInput: '',
  homeIsLoading: true,
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
    case ACTIONS.PRICE_FILTER: {
      return { ...state, priceFilter: payload };
    }
    case ACTIONS.CATEGORY_FILTER: {
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
    case ACTIONS.RATINGS_FILTER: {
      return { ...state, ratingsFilter: payload.rating };
    }
    case ACTIONS.SORTBY: {
      return { ...state, sortBy: payload };
    }
    case ACTIONS.CLEAR_FILTERS: {
      return {
        ...state,
        priceFilter: 4000,
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
    case ACTIONS.CLEAR_WISHLIST: {
      return { ...state, wishlist: [] };
    }
    case ACTIONS.SEARCH_INPUT: {
      return {
        ...state,
        searchInput: payload.searchInput,
      };
    }
    case ACTIONS.HOME_IS_LOADING: {
      return { ...state, homeIsLoading: false };
    }
    default: {
      return state;
    }
  }
}

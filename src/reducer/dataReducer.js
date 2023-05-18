export const ACTIONS = {
  INITIALLOAD: 'initial-load',
  PRICEFILTER: 'price-filter',
  CATEGORYFILTER: 'category-filter',
  RATINGSFILTER: 'ratings-filter',
  SORTBY: 'sort-by',
  CLEARFILTERS: false,
};
export const initialState = {
  products: [],
  cart: [],
  wishList: [],
  priceFilter: null,
  categoryFilter: { men: false, women: false },
  ratingsFilter: null,
  sortBy: null,
};

export default function dataReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INITIALLOAD: {
      return { ...state, products: payload.products };
    }
    case ACTIONS.PRICEFILTER: {
      return { ...state, priceFilter: payload };
    }
    case ACTIONS.CATEGORYFILTER: {
      return {
        ...state,
        categoryFilter: {
          ...state.categoryFilter,
          [payload.category]: payload.checked,
        },
      };
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
        priceFilter: null,
        categoryFilter: { men: false, women: false },
        ratingsFilter: null,
        sortBy: null,
      };
    }
    default: {
      return state;
    }
  }
}

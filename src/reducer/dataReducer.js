export const ACTIONS = {
  INITIALLOAD: 'initial-load',
  PRICEFILTER: 'price-filter',
  CATEGORYFILTER: 'category-filter',
  RATINGSFILTER: 'ratings-filter',
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
    default: {
      return state;
    }
  }
}

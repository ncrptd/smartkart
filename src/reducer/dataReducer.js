export const ACTIONS = {
  INITIALLOAD: 'initial-load',
  PRICEFILTER: 'price-filter',
  CATEGORYFILTER: 'category-filter',
  RATINGSFILTER: 'ratings-filter',
  SORTBY: 'sort-by',
  CLEARFILTERS: 'clear-filters',
  AddTOWISHLIST: 'add-to-wishlist',
};
export const initialState = {
  products: [],
  categories: [],
  cart: [],
  wishList: [],
  priceFilter: null,
  categoryFilter: { Men: false, Women: false },
  ratingsFilter: null,
  sortBy: null,
};
export default function dataReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INITIALLOAD: {
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
        priceFilter: null,
        categoryFilter: { Men: false, Women: false },
        ratingsFilter: null,
        sortBy: null,
      };
    }
    // case ACTIONS.AddTOWISHLIST: {
    //   const product = state.products.find(({ id }) => id === payload);
    //   const getWishList = async () => {
    //     const wishList = await axios.post('/api/user/wishlist', {
    //       product,
    //     });
    //     return wishList;
    //   };
    //   const wishlist = getWishList();
    //   console.log(wishlist);
    //   return state;
    // }
    default: {
      return state;
    }
  }
}

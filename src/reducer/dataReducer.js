export const ACTIONS = {
  INITIALLOAD: 'initial-load',
};
export default function dataReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.INITIALLOAD: {
      const t = { ...state, products: payload.products };
      return t;
    }
    default: {
      return state;
    }
  }
}

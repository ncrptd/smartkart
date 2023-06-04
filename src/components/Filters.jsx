import { useData, useDataDispatch } from '../contexts/DataContext';
import { ACTIONS } from '../reducer/dataReducer';
const RATINGS = [4, 3, 2, 1];
export default function Filters() {
  const dispatch = useDataDispatch();
  const { state } = useData();
  const { categoryFilter, priceFilter, ratingsFilter, sortBy } = state;
  const handleCategoryFilter = (categoryName, checked) => {
    dispatch({
      type: ACTIONS.CATEGORY_FILTER,
      payload: { category: categoryName, checked: checked },
    });
  };

  const handleRatingsFilter = (e) => {
    const rating = Number(e.target.value);
    dispatch({
      type: ACTIONS.RATINGS_FILTER,
      payload: { rating: rating },
    });
  };
  const handlePriceSort = (sortBy) => {
    dispatch({ type: ACTIONS.SORTBY, payload: sortBy });
  };

  return (
    <div className="flex flex-col justify-between gap-2 md:gap-6 text-sm w-full ">
      <div className="flex justify-between">
        <h2 className="font-bold">Filters</h2>
        <button
          className="font-thin hover:text-slate-500"
          onClick={() => dispatch({ type: ACTIONS.CLEAR_FILTERS })}
        >
          Clear
        </button>
      </div>
      {/* price filter  */}

      <div>
        <p className="font-bold">Price</p>
        <div className="flex justify-between">
          <span>500</span>
          <span>1000</span>
          <span>4000</span>
        </div>
        <input
          onChange={(e) => {
            dispatch({ type: ACTIONS.PRICE_FILTER, payload: e.target.value });
          }}
          value={priceFilter}
          className="w-full"
          type="range"
          min={500}
          max={4000}
        />
      </div>
      {/* Category filter  */}
      <div className="flex flex-col gap-2">
        <p className="font-bold">Category</p>
        {Object.keys(categoryFilter).map((category) => (
          <div className="flex gap-2" key={category}>
            <input
              type="checkbox"
              name={category}
              id={category}
              value={category}
              checked={categoryFilter[category]}
              onChange={(e) => handleCategoryFilter(category, e.target.checked)}
            />
            <label htmlFor={category}>{category} Clothing</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Rating</p>
        <form>
          {RATINGS.map((rating) => {
            return (
              <div className="flex gap-2 mb-2" key={rating}>
                <input
                  type="radio"
                  name="ratings"
                  id={rating}
                  value={rating}
                  checked={ratingsFilter === rating}
                  onChange={handleRatingsFilter}
                />
                <label htmlFor={rating}>{rating} stars and above</label>
              </div>
            );
          })}
        </form>
        <form>
          <div className="flex flex-col gap-2">
            <p
              className="font-bold
        "
            >
              Sort By
            </p>
            <div className="flex gap-2">
              <input
                type="radio"
                name="price-sort"
                id="low-to-high"
                checked={sortBy === 'low-to-high'}
                onChange={() => handlePriceSort('low-to-high')}
              />
              <label htmlFor="low-to-high">Low to High</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="price-sort"
                id="high-to-low"
                checked={sortBy === 'high-to-low'}
                onChange={() => handlePriceSort('high-to-low')}
              />
              <label htmlFor="high-to-low">High to low</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

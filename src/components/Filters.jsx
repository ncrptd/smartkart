import { useData, useDataDispatch } from '../contexts/DataContext';
import { ACTIONS } from '../reducer/dataReducer';
const RATINGS = [4, 3, 2, 1];
export default function Filters() {
  const dispatch = useDataDispatch();
  const { categoryFilter, ratingsFilter } = useData();
  const handleCategoryFilter = (category, checked) => {
    dispatch({
      type: ACTIONS.CATEGORYFILTER,
      payload: { category: category, checked: checked },
    });
  };
  const handleRatingFilter = (rating) => {
    dispatch({ type: ACTIONS.RATINGSFILTER, payload: rating });
  };
  return (
    <div className="container mx-auto  flex flex-col gap-4 text-base w-full px-4">
      <div className="flex justify-between">
        <h2 className="font-bold">Filters</h2>
        <button className="font-thin">Clear</button>
      </div>
      {/* price filter  */}

      <div>
        <p className="font-bold">Price</p>
        <div className="flex justify-between">
          <span>50</span>
          <span>150</span>
          <span>200</span>
        </div>
        <input
          onChange={(e) => {
            dispatch({ type: ACTIONS.PRICEFILTER, payload: e.target.value });
          }}
          className="w-full"
          type="range"
          min={50}
          max={200}
        />
      </div>
      {/* Category filter  */}
      <div className="flex flex-col gap-2">
        <p className="font-bold">Category</p>
        {Object.keys(categoryFilter).map((category) => (
          <div className="flex gap-1" key={category}>
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
      {/* Rating Filter  */}
      <div className="flex flex-col gap-1">
        <p className="font-bold">Rating</p>

        {RATINGS.map((rating) => (
          <div className="flex gap-1" key={rating}>
            <input
              type="radio"
              name={rating}
              id={rating}
              value={rating}
              checked={Number(ratingsFilter) === Number(rating)}
              onChange={() => handleRatingFilter(rating)}
            />
            <label htmlFor={rating}>{rating} Stars & above</label>
          </div>
        ))}
      </div>
      {/* Sort by  */}
      <div className="flex flex-col gap-1">
        <p
          className="font-bold
        "
        >
          Sort By
        </p>
        <div className="flex gap-1">
          <input type="radio" name="low-to-high" id="low-to-high" />
          <label htmlFor="low-to-high">Low to High</label>
        </div>
        <div className="flex gap-1">
          <input type="radio" name="high-to-low" id="high-to-lwo" />
          <label htmlFor="high-to-low">High to low</label>
        </div>
      </div>
    </div>
  );
}

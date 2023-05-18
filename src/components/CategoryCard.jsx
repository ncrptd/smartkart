import { Link } from 'react-router-dom';
import { ACTIONS } from '../reducer/dataReducer';
import { useDataDispatch } from '../contexts/DataContext';
function CategoryCard({ src, name, category, checked }) {
  const dispatch = useDataDispatch();
  return (
    <Link to="/productsList">
      <div
        className=" rounded-xl p-4 border-2 border-gray-100 shadow-xl"
        onClick={() => {
          dispatch({
            type: ACTIONS.CATEGORYFILTER,
            payload: { category: category, checked: checked },
          });
        }}
      >
        <img src={src} alt="men-category" />
        <div className="mt-4 ">
          <p className="uppercase text-sm">New Arrival</p>
          <h2 className="font-medium">{name} Collection</h2>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;

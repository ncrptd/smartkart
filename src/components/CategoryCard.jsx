import { useNavigate } from 'react-router-dom';
import { ACTIONS } from '../reducer/dataReducer';
import { useDataDispatch } from '../contexts/DataContext';
function CategoryCard({ src, category, checked }) {
  const dispatch = useDataDispatch();
  const navigate = useNavigate();

  return (
    <div
      className=" rounded-xl p-4 border-2 border-gray-100 shadow-xl cursor-pointer hover:shadow-2xl "
      onClick={() => {
        dispatch({
          type: ACTIONS.CATEGORY_FILTER,
          payload: { category: category, checked: checked },
        });
        navigate('/productsList');
      }}
    >
      <div className="h-86">
        <img
          src={src}
          alt={category}
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
      <div className="mt-4 ">
        <p className="uppercase text-sm">New Arrival</p>
        <h2 className="font-medium">{category} Collection</h2>
      </div>
    </div>
  );
}

export default CategoryCard;

import CategoryCard from './CategoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useData } from '../contexts/DataContext';

function Categories() {
  const { state } = useData();
  const { categories } = state;
  return (
    <section className=" flex flex-col justify-center items-center py-6 space-y-4 bg-slate-50">
      <div className="py-4  w-full text-center">
        <h2 className="font-semibold">
          Shop By Category{' '}
          <span>
            <FontAwesomeIcon icon={faStar} />
          </span>
        </h2>
      </div>
      <div
        className="flex gap-4 md:flex-row px-4 md:gap-20 justify-center w-full
      "
      >
        {categories.map((category) => (
          <CategoryCard
            category={category.categoryName}
            checked={true}
            src={category.imageUrl}
            id={category._id}
            key={category._id}
          />
        ))}
      </div>
    </section>
  );
}

export default Categories;

import CategoryCard from './CategoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useData } from '../contexts/DataContext';

function Categories() {
  const { categories } = useData();
  return (
    <section className=" flex flex-col justify-center items-center py-6 space-y-4 ">
      <div className="py-4 bg-white  w-full text-center">
        <h2 className="font-semibold">
          Shop By Category{' '}
          <span>
            <FontAwesomeIcon icon={faStar} />
          </span>
        </h2>
      </div>
      <div
        className="flex gap-4 md:flex-row container mx-auto px-4 justify-center
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

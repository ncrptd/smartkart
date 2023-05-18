import men from '../assets/images/categoriesImages/men.webp';
import women from '../assets/images/categoriesImages/women.webp';
import CategoryCard from './CategoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
function Categories() {
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
        <CategoryCard src={men} name="Men's" category="men" checked={true} />
        <CategoryCard
          src={women}
          name="Women's"
          category="women"
          checked={true}
        />
      </div>
    </section>
  );
}

export default Categories;

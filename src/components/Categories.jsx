import men from '../assets/images/categoriesImages/men.webp';
import women from '../assets/images/categoriesImages/women.webp';
import CategoryCard from './CategoryCard';

function Categories() {
  return (
    <section className=" flex flex-col justify-center items-center py-6 space-y-4 ">
      <div className="py-4 ">
        <img
          src="https://res.cloudinary.com/dwghy6c1x/image/upload/v1684303067/4396ab78-e90b-4336-ac24-2f9f30ee8a5e1683531623208-Shop-By-Category_uxxee3.webp"
          alt="shop by category"
        />
      </div>
      <div
        className="flex md:flex-row
      "
      >
        <CategoryCard src={men} name="Men's" />
        <CategoryCard src={women} name="Women's" />
      </div>
    </section>
  );
}

export default Categories;

import men from '../assets/images/categoriesImages/men.webp';
import women from '../assets/images/categoriesImages/women.webp';
import CategoryCard from './CategoryCard';

function Categories() {
  return (
    <section className=" md:container md:mx-auto flex flex-col justify-center items-center py-6 space-y-4 md:flex-row">
      <CategoryCard src={men} name="Men's" />
      <CategoryCard src={women} name="Women's" />
    </section>
  );
}

export default Categories;

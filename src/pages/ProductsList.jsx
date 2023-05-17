import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import { useData } from '../contexts/DataContext';
function ProductsList() {
  const { products } = useData();
  return (
    <div className="text-center flex p-4">
      <Filters />

      <div className="md:container md:mx-auto flex flex-wrap justify-center align-center gap-6 p-4">
        {products.map(({ id, title, price, imageUrl, rating, numReviews }) => (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            imageUrl={imageUrl}
            rating={rating}
            numReviews={numReviews}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;

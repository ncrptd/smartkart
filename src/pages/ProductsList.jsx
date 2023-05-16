import ProductCard from '../components/ProductCard';
import { useData } from '../contexts/DataContext';
function ProductsList() {
  const { products } = useData();
  return (
    <div className="md:container md:mx-auto flex flex-wrap justify-center align-center gap-4 p-4">
      {products.map(({ _id, title, price, imageUrl, rating, numReviews }) => (
        <ProductCard
          key={_id}
          id={_id}
          title={title}
          price={price}
          imageUrl={imageUrl}
          rating={rating}
          numReviews={numReviews}
        />
      ))}
    </div>
  );
}

export default ProductsList;

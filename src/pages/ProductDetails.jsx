import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import ProductDetailsCard from '../components/ProductDetailsCard';

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useData();
  const product = products.find((item) => id === item._id);
  console.log(product);
  return (
    <section>
      <div className="container mx-auto">
        <ProductDetailsCard product={product} />
      </div>
    </section>
  );
}

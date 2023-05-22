import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import ProductDetailsCard from '../components/ProductDetailsCard';

export default function ProductDetails() {
  const { productId } = useParams();
  const { products } = useData();
  const product = products.find((product) => product._id === productId);
  return (
    <section>
      <div className="container mx-auto p-4 flex justify-center items-center md:p-10 ">
        <ProductDetailsCard product={product} />
      </div>
    </section>
  );
}

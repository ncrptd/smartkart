import WishlistCard from '../components/WishlistCard';
import { useData } from '../contexts/DataContext';

export default function Wishlist() {
  const { wishlist } = useData();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold uppercase">My Wishlist</h1>
      <div className="flex  flex-wrap gap-6 justify-center p-4">
        {wishlist.map((product) => (
          <WishlistCard product={product} key={product?._id} />
        ))}
      </div>
    </div>
  );
}

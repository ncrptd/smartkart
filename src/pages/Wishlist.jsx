import { useData } from '../contexts/DataContext';

export default function Wishlist() {
  const { wishlist } = useData();
  console.log(wishlist);
  return (
    <div className="container mx-auto flex flex-wrap p-4">
      wishlist {wishlist.length}
    </div>
  );
}

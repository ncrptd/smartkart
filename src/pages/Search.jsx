import { useLocation } from 'react-router-dom';
import Searchbar2 from '../components/Searchbar2';
import { useData } from '../contexts/DataContext';
import ProductCard from '../components/ProductCard';
export default function Search() {
  const location = useLocation();
  const { products, searchInput, handleSearchInput } = useData();
  let visibleProducts = [];

  const getTitleFilteredData = (products, searchInput) => {
    return products?.filter((item) =>
      item?.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  visibleProducts = getTitleFilteredData(products, searchInput);
  return (
    <div className="container mx-auto p-10">
      {location.pathname === '/search' && (
        <div
          className="mt-2 max-w-2xl container mx-auto md:hidden
        "
        >
          <Searchbar2
            handleSearchInput={handleSearchInput}
            value={searchInput}
          />
        </div>
      )}
      <div className="flex flex-wrap">
        {visibleProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
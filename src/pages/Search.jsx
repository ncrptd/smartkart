import { useLocation } from 'react-router-dom';
import Searchbar2 from '../components/Searchbar2';
import { useData, useDataDispatch } from '../contexts/DataContext';
import ProductCard from '../components/ProductCard';
import { useEffect } from 'react';
import { ACTIONS } from '../reducer/dataReducer';
export default function Search() {
  const dispatch = useDataDispatch();
  useEffect(() => {
    dispatch({ type: ACTIONS.SEARCH_INPUT, payload: { searchInput: '' } });
  }, []);
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
    <div className="container mx-auto ">
      {location.pathname === '/search' && (
        <div
          className="mt-2 max-w-2xl container mx-auto md:hidden px-4
        "
        >
          <Searchbar2
            handleSearchInput={handleSearchInput}
            value={searchInput}
          />
        </div>
      )}
      <div className="flex flex-wrap p-8">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product?._id} />
        ))}
      </div>
    </div>
  );
}

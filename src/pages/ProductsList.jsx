import { useState } from 'react';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import { useData } from '../contexts/DataContext';

function ProductsList() {
  const { products, priceFilter, categoryFilter, ratingsFilter, sortBy } =
    useData();
  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    setShow(!show);
  };

  function getPriceFilteredData(products, price) {
    if (price) {
      return products.filter(
        (product) => Number(product.price) <= Number(price)
      );
    }
    return products;
  }
  function getCategoryFilteredData(products, categoryFilter) {
    const selectedCategory = Object.keys(categoryFilter).filter(
      (category) => categoryFilter[category]
    );
    return products.filter((product) =>
      selectedCategory.includes(product.category)
    );
  }
  function getRatingsFilteredData(products, rating) {
    if (rating) {
      console.log(rating);
      const r = products.filter((product) => product.rating >= rating);
      console.log(r);
      return r;
    }
    return products;
  }
  function getSortByPriceData(products, sortBy) {
    console.log(sortBy);
    if (sortBy && sortBy === 'high-to-low') {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortBy && sortBy === 'low-to-high') {
      return products.sort((a, b) => a.price - b.price);
    }
    return products;
  }
  const priceFilteredData = getPriceFilteredData(products, priceFilter);
  const categoryFilteredData = getCategoryFilteredData(
    priceFilteredData,
    categoryFilter
  );
  const ratingsFilteredData = getRatingsFilteredData(
    categoryFilteredData,
    ratingsFilter
  );
  const sortyByPriceData = getSortByPriceData(ratingsFilteredData, sortBy);
  const visibleData = sortyByPriceData;
  return (
    <div className="text-center flex p-4">
      <div className="hidden  md:block">
        <Filters />
      </div>

      <div className="md:container md:mx-auto flex flex-wrap justify-center align-center gap-4 pb-8">
        {visibleData.map(
          ({ id, title, price, imageUrl, rating, numReviews }) => (
            <ProductCard
              key={id}
              id={id}
              title={title}
              price={price}
              imageUrl={imageUrl}
              rating={rating}
              numReviews={numReviews}
            />
          )
        )}
      </div>

      <div className=" fixed  bottom-0 left- 0 right-0 w-full bg-slate-100 text-base md:hidden">
        <div onClick={handleShow}>
          <div className=" flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
          <p>Filter</p>
        </div>
        <div className={show ? 'hidden' : 'block'}>
          <Filters />
        </div>
      </div>
    </div>
  );
}

export default ProductsList;

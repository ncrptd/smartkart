import React from 'react';
import Banner from './Banner';

function Categories() {
  return (
    <section className="categories ">
      <div className="container category">
        <Banner />
        <div className="category__women"></div>
        <div className="category__men"></div>
      </div>
    </section>
  );
}

export default Categories;

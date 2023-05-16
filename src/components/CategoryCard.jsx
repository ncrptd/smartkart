function CategoryCard({ src, name }) {
  return (
    <div className=" rounded-xl p-4 border-2 border-gray-100 shadow-xl">
      <img src={src} alt="men-category" />
      <div className="mt-4 ">
        <p className="uppercase text-sm">New Arrival</p>
        <h2 className="font-medium">{name} Collection</h2>
      </div>
    </div>
  );
}

export default CategoryCard;

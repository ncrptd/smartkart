export default function Filters() {
  return (
    <div className="container mx-auto  flex flex-col gap-4 text-base w-full px-4">
      <div className="flex justify-between">
        <h2 className="font-bold">Filters</h2>
        <button className="font-thin">Clear</button>
      </div>
      {/* price filter  */}

      <div>
        <p className="font-bold">Price</p>
        <div className="flex justify-between">
          <span>50</span>
          <span>150</span>
          <span>200</span>
        </div>
        <input className="w-full" type="range" name="" id="" />
      </div>
      {/* Category filter  */}
      <div className="flex flex-col gap-1">
        <p className="font-bold">Category</p>
        <div className="flex gap-1">
          <input type="checkbox" name="men" id="men" />
          <label htmlFor="men">Men Clothing</label>
        </div>
        <div className="flex gap-1">
          <input type="checkbox" name="women" id="women" />
          <label htmlFor="men">Women Clothing</label>
        </div>
      </div>
      {/* Rating Filter  */}
      <div className="flex flex-col gap-1">
        <p className="font-bold">Rating</p>
        <div className="flex gap-1">
          <input type="radio" name="4" id="4" value={4} />
          <label htmlFor="4">4 Stars & above</label>
        </div>
        <div className="flex gap-1">
          <input type="radio" name="3" id="3" value={3} />
          <label htmlFor="3">3 Stars & above</label>
        </div>
        <div className="flex gap-1">
          <input type="radio" name="2" id="2" value={2} />
          <label htmlFor="2">2 Stars & above</label>
        </div>
        <div className="flex gap-1">
          <input type="radio" name="1" id="1" value={1} />
          <label htmlFor="1">1 Stars & above</label>
        </div>
      </div>
      {/* Sort by  */}
      <div className="flex flex-col gap-1">
        <p
          className="font-bold
        "
        >
          Sort By
        </p>
        <div className="flex gap-1">
          <input type="radio" name="low-to-high" id="low-to-high" />
          <label htmlFor="low-to-high">Low to High</label>
        </div>
        <div className="flex gap-1">
          <input type="radio" name="high-to-low" id="high-to-lwo" />
          <label htmlFor="high-to-low">High to low</label>
        </div>
      </div>
    </div>
  );
}

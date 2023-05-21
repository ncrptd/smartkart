import { Link } from 'react-router-dom';

export default function CartCard({ product }) {
  let { imageUrl, title, price, qty, id, original_price } = product;

  price = parseFloat(price);
  original_price = parseFloat(original_price);

  const discount = Number(((1 - price / original_price) * 100).toFixed(1));
  console.log('cart-card', original_price, price);
  return (
    <div className="flex rounded-xl md:w-3/4 md:shadow-lg overflow-hidden mb-4 text-slate-600">
      <Link to={`productDetails/${id}`}>
        <div className="w-full h-full">
          <img
            className="h-full w-full object-cover rounded-tl-xl  rounded-tr-xl "
            src={imageUrl}
            alt={title}
          />
        </div>
      </Link>

      <div
        className="p-4 w-full text-base flex flex-col gap-4 justify-between 
        "
      >
        <div
          className="flex flex-col gap-1 md:text-xl 
        "
        >
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-2xl ">
            &#36;{price}{' '}
            <span className="font-thin text-lg line-through">
              {original_price}
            </span>
          </p>
          <p className="font-semibold">{discount}% OFF</p>
          <div className="flex gap-4 items-center ">
            <p>Quantity</p>
            <div className="flex space-x-2 text-lg font-bold">
              <button className="">-</button>{' '}
              <p className="border-2 rounded-full p-1">{qty}</p>{' '}
              <button>+</button>
            </div>
          </div>
        </div>
        <button
          className=" text-sm bg-pink-600
            w-full md:py-1.5 md:px-2 text-white font-bold 
            "
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
}

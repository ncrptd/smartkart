import { Link } from 'react-router-dom';

export default function CartCard({ imageUrl, title, price, quantity, id }) {
  return (
    <Link to={`productDetails/${id}`}>
      <div className="flex rounded-xl md:w-full md:shadow-xl ">
        <div className="w-full">
          <img
            className="h-full w-full object-cover rounded-tl-xl  rounded-tr-xl"
            src={imageUrl}
            alt={title}
          />
        </div>
        <div
          className="p-4 w-full text-base flex flex-col justify-between 
        "
        >
          <div
            className="flex flex-col gap-1 md:text-xl
        "
          >
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-2xl font-bold">&#36;{price}</p>
            <div className="flex gap-4 items-center ">
              <p>Quantity</p>
              <div className="flex space-x-2 text-lg font-semibold">
                <button className="">-</button>{' '}
                <span className="border-2 rounded-full p-1">{quantity}</span>{' '}
                <button>+</button>
              </div>
            </div>
          </div>
          <button
            className=" text-sm bg-pink-600
            w-full py-1.5 px-2 text-white font-bold 
            "
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

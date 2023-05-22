import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function ProductDetailsCard({ product }) {
  // const {
  //   imageUrl,
  //   title,
  //   rating,
  //   numReviews,
  //   price,
  //   description,
  //   sizes,
  //   _id,
  // } = product;
  const { cart, wishlist, addToCartHandler, addToWishlistHandler } = useData();
  const { isLoggedIn } = useAuth();

  const inCart = cart?.some((item) => {
    return item._id === product?._id;
  });
  const inWishlist = wishlist.some((item) => item._id === product?._id);

  return product ? (
    <div className="shadow-xl rounded-xl  flex flex-col  border-2 border-gray-400 lg:w-2/4 lg:flex-row gap-6 p-4 h-full">
      <div className="relative shadow-lg  ">
        <img
          src={product?.imageUrl}
          alt={product?.title}
          className="rounded-xl object-cover h-full w-full"
        />
        <div onClick={(e) => addToWishlistHandler(inWishlist, e, product)}>
          <FontAwesomeIcon
            icon={faHeart}
            // p-2 rounded-full bg-slate-300 text-gray-700 inline-block absolute top-2 right-2
            className={`p-2 rounded-full   inline-block absolute top-2 right-2 ${
              inWishlist
                ? 'bg-pink-500 text-white'
                : 'bg-slate-300 text-slate-600'
            }`}
          />
        </div>
        <p
          className="absolute bottom-2 left-2 py-1 px-2 bg-pink-600 text-white rounded-lg 
    "
        >
          <span className="mr-2">&#9733; {product?.rating}</span>
        </p>
      </div>
      <div className=" flex flex-col space-y-2 lg:bg-slate-100 lg:px-2 lg:rounded-xl">
        <h1 className="font-bold text-4xl">{product?.title}</h1>
        <p className="">{product?.numReviews} reviews</p>
        <p className="mb-2 font-semibold">
          <span>&#8377;</span>
          {product?.price}
        </p>

        <p className="font-semibold">
          Description:{' '}
          <span className="font-normal">{product?.description}</span>
        </p>
        <p className="font-semibold">
          Sizes:{' '}
          {product?.sizes.map((size) => (
            <span
              key={size}
              className="mr-2 last-of-type:mr-0 inline-block font-normal"
            >
              {size}
            </span>
          ))}
        </p>

        {inCart ? (
          <Link
            to="/cart"
            className="text-white
       py-1 px-4 block w-full bg-fuchsia-600 text-center"
          >
            Go to Cart
          </Link>
        ) : (
          <Link
            to={!isLoggedIn ? '/login' : ''}
            className="bg-pink-600 text-white
       py-1 px-4 block w-full  text-center"
            onClick={() => addToCartHandler(product)}
          >
            Add to Cart
          </Link>
        )}
      </div>
    </div>
  ) : (
    <p>...loading</p>
  );
}

import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useLocation } from 'react-router-dom';
import Searchbar2 from './Searchbar2';
function Header() {
  const { state: authState } = useAuth();
  const { isLoggedIn } = authState;
  const { state, handleSearchInput } = useData();
  const { cart, wishlist, searchInput } = state;

  const totalCartItems = cart.length >= 1 ? cart.length : undefined;
  const totalWishlistItems = wishlist.length >= 1 ? wishlist.length : undefined;
  const location = useLocation();

  return (
    <header className=" p-4  sticky top-0 z-10 bg-slate-100 shadow-xl ">
      <div className="flex justify-between gap-2 items-center container mx-auto ">
        <h1 className="text-xl">
          <Link to="/">SmartKart</Link>
        </h1>
        {location.pathname === '/search' && (
          <div className="hidden md:block w-2/4">
            <Searchbar2
              handleSearchInput={handleSearchInput}
              value={searchInput}
            />
          </div>
        )}
        <ul className=" flex justify-center flex-wrap gap-4 items-center">
          <li>
            <Link
              className="hidden md:block font-sm text-pink-500 "
              to="/productsList"
            >
              Explore
            </Link>
          </li>
          <li className=" text-pink-500">
            {isLoggedIn ? (
              <Link to="/profileDetails">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>

          {location.pathname !== '/search' && (
            <li>
              <Link to="/search">
                <Searchbar placeholder="search" />
              </Link>
            </li>
          )}
          {/* wishlist  */}
          <li className="relative">
            <span
              className={
                totalWishlistItems
                  ? 'absolute bottom-5 left-2 text-sm bg-pink-500 rounded-full w-5 h-5 flex justify-center items-center text-white'
                  : ''
              }
            >
              {totalWishlistItems}
            </span>
            <Link to="/wishlist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" relative w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </Link>
          </li>
          {/* cart  */}
          <li className="relative ">
            <span
              className={
                totalCartItems
                  ? 'absolute bottom-5 left-2 text-sm bg-pink-500 rounded-full w-5 h-5 flex justify-center items-center text-white'
                  : ''
              }
            >
              {totalCartItems}
            </span>
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="  w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;

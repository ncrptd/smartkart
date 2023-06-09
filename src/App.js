import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import RootLayout from './rootLayout/RootLayout';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequiresAuth from './components/RequiresAuth';
import Cart from './pages/Cart';
import ProfileDetails from './pages/ProfileDetails';
import Wishlist from './pages/Wishlist';
import Search from './pages/Search';
import { useData } from './contexts/DataContext';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './pages/PageNotFound';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';

function App() {
  const { homeIsLoading } = useData();

  return homeIsLoading ? (
    <Loader />
  ) : (
    <main className="App text-lg h-screen ">
      <div className={`content-container ${homeIsLoading ? 'loading' : ''}`}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/productsList" element={<ProductsList />} />
            <Route
              path="/productDetails/:productId"
              element={<ProductDetails />}
            />
            <Route
              path="/profileDetails"
              element={
                <RequiresAuth>
                  <ProfileDetails />
                </RequiresAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/cart"
              element={
                <RequiresAuth>
                  <Cart />
                </RequiresAuth>
              }
            />
            <Route
              path="/wishlist"
              element={
                <RequiresAuth>
                  <Wishlist />
                </RequiresAuth>
              }
            ></Route>
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderSummary" element={<OrderSummary />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/mockman" element={<Mockman />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} theme="light" />
    </main>
  );
}

export default App;

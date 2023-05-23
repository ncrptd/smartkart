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
function App() {
  const { homeIsLoading } = useData();
  return (
    <main className="App bg-slate-50 text-lg h-screen">
      {homeIsLoading ? (
        <Loader />
      ) : (
        <div className={`content-container ${homeIsLoading ? 'loading' : ''}`}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/productsList" element={<ProductsList />} />
              <Route
                path="/productDetails/:productId"
                element={
                  <RequiresAuth>
                    <ProductDetails />
                  </RequiresAuth>
                }
              />
              <Route path="/profileDetails" element={<ProfileDetails />} />
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
              <Route path="/mockman" element={<Mockman />} />
            </Route>
          </Routes>
        </div>
      )}
    </main>
  );
}

export default App;

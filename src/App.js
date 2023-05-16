import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import RootLayout from './rootLayout/RootLayout';
import ProductDetails from './pages/ProductDetails';
function App() {
  return (
    <div className="App min-h-screen bg-slate-50 text-2xl">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/mockman" element={<Mockman />} />
          <Route path="/productslist" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

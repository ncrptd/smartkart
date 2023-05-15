import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import Signup from './pages/Signup';
import Home from './pages/Home';
function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </main>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
import Signup from './pages/Signup';
function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </main>
  );
}

export default App;

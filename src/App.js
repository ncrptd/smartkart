import './App.css';
import { Routes, Route } from 'react-router-dom';
import Mockman from 'mockman-js';
function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </main>
  );
}

export default App;

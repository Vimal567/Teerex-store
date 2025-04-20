import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Dashboard />} />
        <Route path='/cart' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

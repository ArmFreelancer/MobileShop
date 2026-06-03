import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Account from './pages/Account';
import PhoneDetail from './pages/PhoneDetail';
import About from './pages/About';
import Compare from './pages/Compare';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/phone/:id" element={<PhoneDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
        <footer className="text-white text-center py-4" style={{ background: '#000' }}>
          <div className="container">
            <p className="mb-0">&copy; 2026 PhoneMarket. All rights reserved.</p>
          </div>
        </footer>
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  );
}

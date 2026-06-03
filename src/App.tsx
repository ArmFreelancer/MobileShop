import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Account from './pages/Account';
import PhoneDetail from './pages/PhoneDetail';
import About from './pages/About';
import Compare from './pages/Compare';
import { t } from './data';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProvider>
        <Navbar />
        <CartDrawer />
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
        <Footer />
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  );
}

function Footer() {
  const { lang } = useApp();
  return (
    <footer className="premium-footer py-5">
      <div className="container py-3">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-phone text-accent"></i> PhoneMarket
            </h5>
            <p className="small mb-3" style={{ lineHeight: 1.6 }}>
              {lang === 'ru' 
                ? 'Лучшие оригинальные смартфоны по доступным ценам в Москве и России. Качество, гарантия и быстрая доставка для каждого клиента.'
                : 'Best original smartphones at affordable prices in Moscow and Russia. Quality, warranty and fast delivery for every customer.'}
            </p>
            <div className="d-flex gap-2 mt-3">
              <a href="https://t.me/armen_levonyan01" target="_blank" rel="noreferrer" className="footer-social-btn" title="Telegram">
                <i className="bi bi-telegram"></i>
              </a>
              <a href="#" className="footer-social-btn" title="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="footer-social-btn" title="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: 1, fontSize: 13 }}>
              {lang === 'ru' ? 'Навигация' : 'Navigation'}
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/">{t('home', lang)}</Link></li>
              <li><Link to="/catalog">{t('catalog', lang)}</Link></li>
              <li><Link to="/about">{t('about', lang)}</Link></li>
              <li><Link to="/compare">{lang === 'ru' ? 'Сравнение' : 'Compare'}</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: 1, fontSize: 13 }}>
              {lang === 'ru' ? 'Контакты' : 'Contacts'}
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt mt-1 text-accent"></i>
                <span>{t('aboutAddress', lang)}</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone text-accent"></i>
                <span>{t('aboutPhone', lang)}</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope text-accent"></i>
                <span>{t('aboutEmail', lang)}</span>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: 1, fontSize: 13 }}>
              {lang === 'ru' ? 'Оплата' : 'Payment'}
            </h6>
            <p className="small mb-3">
              {lang === 'ru' ? 'Мы принимаем к оплате наличные, карты и электронные переводы.' : 'We accept cash, cards, and electronic payments.'}
            </p>
            <div className="d-flex gap-3 flex-wrap" style={{ fontSize: 24, color: '#94a3b8' }}>
              <i className="bi bi-credit-card-2-back" title="Visa/Mastercard"></i>
              <i className="bi bi-wallet2" title="Apple Pay"></i>
              <i className="bi bi-qr-code-scan" title="QR Pay"></i>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <p className="small mb-0">
            &copy; {new Date().getFullYear()} PhoneMarket. All rights reserved.
          </p>
          <div className="d-flex gap-3 small">
            <a href="#">{lang === 'ru' ? 'Конфиденциальность' : 'Privacy'}</a>
            <a href="#">{lang === 'ru' ? 'Условия использования' : 'Terms'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

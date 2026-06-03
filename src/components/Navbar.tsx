import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data';

export default function Navbar() {
  const { user, lang, setLang, currency, setCurrency, cartCount, doLogout, setCartOpen } = useApp();
  const loc = useLocation();

  const isActive = (path: string) => loc.pathname === path ? ' active' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top" style={{ borderBottom: '1px solid #eee' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-phone"></i> {t('brand', lang)}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className={`nav-link${isActive('/')}`} to="/">{t('home', lang)}</Link></li>
            <li className="nav-item"><Link className={`nav-link${isActive('/catalog')}`} to="/catalog">{t('catalog', lang)}</Link></li>
            <li className="nav-item"><Link className={`nav-link${isActive('/cart')}`} to="/cart">{t('cart', lang)}</Link></li>
            <li className="nav-item"><Link className={`nav-link${isActive('/about')}`} to="/about">{t('about', lang)}</Link></li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <Link className="nav-link my-account-link" to="/account">
                  <i className="bi bi-person-circle"></i> {t('myAccount', lang)}
                </Link>
                <button className="btn btn-sm btn-outline-dark" onClick={doLogout} style={{ borderRadius: 20 }}><i className="bi bi-box-arrow-right"></i></button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-dark" to="/login" style={{ borderRadius: 20, textTransform: 'uppercase', fontSize: 12, letterSpacing: 1 }}>{t('signIn', lang)}</Link>
                <Link className="btn btn-sm btn-dark" to="/login" style={{ borderRadius: 20, textTransform: 'uppercase', fontSize: 12, letterSpacing: 1 }}>{t('signUp', lang)}</Link>
              </>
            )}
            <button className="btn btn-outline-dark position-relative animate-hover" onClick={() => setCartOpen(true)} style={{ borderRadius: 20 }}>
              <i className="bi bi-cart3"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: 10 }}>{cartCount()}</span>
            </button>
            <button className="btn btn-sm btn-outline-dark" onClick={() => setCurrency(currency === 'USD' ? 'RUB' : 'USD')} style={{ borderRadius: 20 }}>{currency}</button>
            <button className="btn btn-sm btn-outline-dark" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} style={{ borderRadius: 20 }}>{lang === 'ru' ? 'EN' : 'RU'}</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

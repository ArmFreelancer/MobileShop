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
          <div className="d-flex align-items-center gap-3">
            {/* Account / Login Section */}
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <Link className="user-account-tag" to="/account">
                  <i className="bi bi-person-circle user-icon"></i>
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                </Link>
                <button className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center" onClick={doLogout} style={{ borderRadius: '50%', width: 28, height: 28, padding: 0 }} title={lang === 'ru' ? 'Выйти' : 'Log Out'}>
                  <i className="bi bi-box-arrow-right" style={{ fontSize: 13 }}></i>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link className="btn btn-link text-dark text-decoration-none fw-semibold p-0" to="/login" style={{ fontSize: 13 }}>
                  {t('signIn', lang)}
                </Link>
                <Link className="btn btn-accent rounded-pill fw-semibold shadow-sm" to="/login" style={{ fontSize: 12, padding: '6px 14px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {t('signUp', lang)}
                </Link>
              </div>
            )}

            {/* Cart Pill Button */}
            <button className="btn btn-accent pill-cart-btn shadow-sm" onClick={() => setCartOpen(true)}>
              <i className="bi bi-cart3"></i>
              <div className="cart-divider"></div>
              <span>{cartCount()}</span>
            </button>

            {/* Switcher Pill */}
            <div className="settings-pill">
              <button className="settings-pill-btn" onClick={() => setCurrency(currency === 'USD' ? 'RUB' : 'USD')}>
                {currency}
              </button>
              <div className="settings-pill-divider"></div>
              <button className="settings-pill-btn" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>
                {lang === 'ru' ? 'EN' : 'RU'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

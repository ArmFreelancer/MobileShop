import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data';

export default function CartPage() {
  const { cart, fmtPrice, removeFromCart, changeQty, clearCart, checkout, cartTotal, lang, user } = useApp();

  if (!cart.length) {
    return (
      <div className="container my-5 text-center py-5">
        <i className="bi bi-cart-x" style={{ fontSize: 64, color: '#ccc' }}></i>
        <h4 className="mt-3">{t('cartEmpty', lang)}</h4>
        <Link to="/catalog" className="btn btn-accent mt-2" style={{ borderRadius: 8 }}>{t('goCatalog', lang)}</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">{t('cart', lang)}</h2>
      <div className="row">
        <div className="col-lg-8">
          {cart.map(i => (
            <div key={i.cartId} className="cart-item d-flex align-items-center flex-wrap flex-sm-nowrap gap-3 fade-in p-3 mb-3"
              style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee' }}>
              <div style={{ borderRadius: 8, padding: 8 }}>
                <img src={i.img} alt={i.name} style={{ width: 80, height: 80, objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.08))' }}
                  referrerPolicy="no-referrer" onError={e => (e.target as HTMLElement).style.display = 'none'} />
              </div>
              <div className="flex-grow-1 min-w-0">
                <h6 className="fw-semibold mb-1">{i.name}</h6>
                <small className="text-muted d-block mb-1" style={{ fontSize: 12 }}>
                  {i.brand.toUpperCase()} • {i.selectedColor} • {i.storage}
                </small>
                <span className="fw-bold">{fmtPrice(i.price)}</span>
              </div>
              <div className="qty-control d-flex align-items-center">
                <button className="btn btn-sm btn-outline-dark px-2" onClick={() => changeQty(i.cartId, -1)}>−</button>
                <span className="mx-2 fw-bold">{i.qty}</span>
                <button className="btn btn-sm btn-outline-dark px-2" onClick={() => changeQty(i.cartId, 1)}>+</button>
              </div>
              <div className="fw-bold" style={{ minWidth: 80, textAlign: 'right' }}>
                {fmtPrice(i.price * i.qty)}</div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(i.cartId)}><i className="bi bi-trash"></i></button>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3">{t('total', lang)}</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>{t('subtotal', lang)}</span><span>{fmtPrice(cartTotal())}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>{t('delivery', lang)}</span><span style={{ fontWeight: 600 }}>{t('free', lang)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>{t('total', lang)}</span><span>{fmtPrice(cartTotal())}</span>
            </div>
            <button className="btn btn-accent w-100 mb-2 checkout-btn" onClick={checkout} style={{ borderRadius: 8 }}>
              <i className="bi bi-telegram"></i> {t('checkout', lang)}
            </button>
            <button className="btn btn-outline-accent w-100 clear-cart-btn" onClick={clearCart} style={{ borderRadius: 8 }}>
              <i className="bi bi-trash"></i> {t('clearCart', lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

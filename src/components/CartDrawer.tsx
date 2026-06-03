import { useApp } from '../context/AppContext';
import { t } from '../data';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    fmtPrice,
    removeFromCart,
    changeQty,
    clearCart,
    checkout,
    cartTotal,
    lang
  } = useApp();

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`cart-drawer-backdrop ${cartOpen ? 'show' : ''}`} 
        onClick={() => setCartOpen(false)}
      ></div>

      {/* Cart Drawer Panel */}
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <i className="bi bi-cart3"></i> {t('cart', lang)}
            {cart.length > 0 && (
              <span className="badge rounded-pill bg-danger" style={{ fontSize: 12 }}>
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </h5>
          <button 
            type="button" 
            className="btn-close shadow-none" 
            onClick={() => setCartOpen(false)}
            aria-label="Close"
          ></button>
        </div>

        <div className="cart-drawer-body p-3 overflow-y-auto">
          {!cart.length ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x text-muted" style={{ fontSize: 64 }}></i>
              <h5 className="mt-3">{t('cartEmpty', lang)}</h5>
              <button 
                className="btn btn-sm btn-outline-dark mt-2" 
                style={{ borderRadius: 20 }}
                onClick={() => setCartOpen(false)}
              >
                {t('goCatalog', lang)}
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map(item => (
                <div 
                  key={item.cartId} 
                  className="d-flex align-items-center gap-3 p-2 border rounded position-relative"
                  style={{ background: '#fff' }}
                >
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ width: 60, height: 60, objectFit: 'contain' }}
                    referrerPolicy="no-referrer"
                    onError={e => (e.target as HTMLElement).style.display = 'none'}
                  />
                  <div className="flex-grow-1 min-w-0">
                    <h6 className="fw-semibold mb-1 text-truncate" style={{ fontSize: 14 }}>{item.name}</h6>
                    <small className="text-muted d-block mb-1" style={{ fontSize: 11 }}>
                      {item.brand.toUpperCase()} • {item.selectedColor} • {item.storage}
                    </small>
                    <span className="fw-bold text-accent" style={{ fontSize: 13 }}>{fmtPrice(item.price)}</span>
                    
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div className="qty-control d-flex align-items-center" style={{ scale: '0.85', transformOrigin: 'left center' }}>
                        <button className="btn btn-sm btn-outline-dark px-2" onClick={() => changeQty(item.cartId, -1)}>−</button>
                        <span className="mx-2 fw-bold">{item.qty}</span>
                        <button className="btn btn-sm btn-outline-dark px-2" onClick={() => changeQty(item.cartId, 1)}>+</button>
                      </div>
                      <span className="fw-semibold text-muted" style={{ fontSize: 13 }}>
                        {fmtPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-danger border-0 position-absolute" 
                    style={{ top: 8, right: 8, padding: '2px 6px' }}
                    onClick={() => removeFromCart(item.cartId)}
                  >
                    <i className="bi bi-trash" style={{ fontSize: 12 }}></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer p-3 border-top bg-light">
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>{t('total', lang)}</span>
              <span>{fmtPrice(cartTotal())}</span>
            </div>
            
            <button 
              className="btn btn-accent w-100 mb-2 checkout-btn d-flex align-items-center justify-content-center gap-2" 
              onClick={() => {
                checkout();
                setCartOpen(false); // Close drawer after trigger
              }} 
              style={{ borderRadius: 8 }}
            >
              <i className="bi bi-telegram"></i> {t('checkout', lang)}
            </button>

            <button 
              className="btn btn-sm btn-outline-secondary w-100 py-2 border-0" 
              onClick={clearCart} 
              style={{ borderRadius: 8, fontSize: 13 }}
            >
              <i className="bi bi-trash"></i> {t('clearCart', lang)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

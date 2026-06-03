import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data';

export default function Account() {
  const { user, lang, fmtPrice } = useApp();

  if (!user) {
    return (
      <div className="container my-5 text-center py-5">
        <p className="text-muted">{t('loginRequired', lang)}</p>
        <Link to="/login" className="btn btn-accent" style={{ borderRadius: 8 }}>{t('signIn', lang)}</Link>
      </div>
    );
  }

  const orders = user.orders || [];

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm p-4 text-center">
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 12px' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h5 className="fw-bold">{user.name}</h5>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>
        <div className="col-lg-8">
          <h4 className="fw-bold mb-3">{t('orderHistory', lang)}</h4>
          {!orders.length ? (
            <p className="text-muted">{t('noOrders', lang)}</p>
          ) : (
            [...orders].reverse().map(o => (
              <div key={o.id} className="card border-0 shadow-sm p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">#{o.id}</span>
                  <span className="badge bg-dark">{o.status}</span>
                </div>
                <small className="text-muted d-block mb-2">{o.date}</small>
                {o.items.map((i: any) => (
                  <div key={i.id} className="d-flex justify-content-between small">
                    <span>{i.name} × {i.qty}</span>
                    <span>{fmtPrice(i.price * i.qty)}</span>
                  </div>
                ))}
                <hr className="my-1" />
                <div className="d-flex justify-content-between fw-bold">
                  <span>{t('total', lang)}</span>
                  <span>{fmtPrice(o.total)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

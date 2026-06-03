import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PHONES, t } from '../data';
import { addRecent } from '../utils/recent';

export default function PhoneDetail() {
  const { id } = useParams();
  const { addToCart, fmtPrice, lang } = useApp();
  const phone = PHONES.find(p => p.id === Number(id));

  useEffect(() => {
    if (phone) addRecent(phone.id);
  }, [phone]);

  if (!phone) {
    return (
      <div className="container my-5 text-center py-5">
        <h4>Phone not found</h4>
        <Link to="/catalog" className="btn btn-dark" style={{ borderRadius: 8 }}>{t('back', lang)}</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link to="/catalog" className="btn btn-outline-dark btn-sm mb-4" style={{ borderRadius: 20 }}>← {t('back', lang)}</Link>
      <div className="row g-5 align-items-start">
        <div className="col-md-6">
          <div style={{ borderRadius: 16, padding: 30, textAlign: 'center' }}>
            <img src={phone.img} alt={phone.name}
              style={{ width: '100%', maxHeight: 400, objectFit: 'contain', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,.1))' }}
              referrerPolicy="no-referrer" onError={e => (e.target as HTMLElement).style.display = 'none'} />
          </div>
        </div>
        <div className="col-md-6">
          <small style={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{phone.brand}</small>
          <h1 className="fw-bold mt-1 mb-3">{phone.name}</h1>
          <p style={{ color: '#555', lineHeight: 1.7 }}>{phone.desc}</p>

          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
            <span className="fw-bold fs-3">{fmtPrice(phone.price)}</span>
            <button className="btn btn-accent" onClick={() => addToCart(phone)}>
              <i className="bi bi-cart-plus"></i> {t('addToCart2', lang)}
            </button>
          </div>

          <h5 className="fw-bold mb-3">{t('details', lang)}</h5>
          <div style={{ borderTop: '1px solid #eee' }}>
            {phone.specs.map((s, i) => (
              <div key={i} className="d-flex py-2" style={{ borderBottom: '1px solid #eee' }}>
                <span style={{ color: '#888', minWidth: 120 }}>{s.label}</span>
                <span className="fw-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

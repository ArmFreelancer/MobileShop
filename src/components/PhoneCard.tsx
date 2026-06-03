import { Link } from 'react-router-dom';
import type { Phone } from '../types';
import { useApp } from '../context/AppContext';
import { t } from '../data';

interface Props { phone: Phone }

export default function PhoneCard({ phone }: Props) {
  const { addToCart, fmtPrice, lang } = useApp();

  return (
    <div className="col-6 col-md-4 col-lg-3 fade-in">
      <div className="card phone-card h-100 border-0">
        <Link to={`/phone/${phone.id}`}>
          <div style={{ textAlign: 'center', padding: '20px 15px', borderRadius: '12px 12px 0 0' }}>
            <img src={phone.img} alt={phone.name}
              style={{ height: 180, objectFit: 'contain', maxWidth: '100%', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.08))' }}
              referrerPolicy="no-referrer" onError={(e: React.SyntheticEvent<HTMLImageElement>) => (e.target as HTMLElement).style.display = 'none'} />
          </div>
        </Link>
        <div className="card-body text-center d-flex flex-column">
          <small style={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 }}>{phone.brand}</small>
          <Link to={`/phone/${phone.id}`} style={{ color: '#111', textDecoration: 'none' }}>
            <h6 className="fw-semibold mt-1">{phone.name}</h6>
          </Link>
          <span className="price-badge mb-3 align-self-center">{fmtPrice(phone.price)}</span>
          <button type="button" className="btn btn-accent mt-auto w-100" onClick={e => { e.stopPropagation(); addToCart(phone); }}>
            <i className="bi bi-cart-plus"></i> {t('addToCart', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}

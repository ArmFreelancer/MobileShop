import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PHONES, t } from '../data';
import { addRecent } from '../utils/recent';
import { getPhoneColors, getPhoneStorages } from '../utils/configurator';

export default function PhoneDetail() {
  const { id } = useParams();
  const { addToCart, fmtPrice, lang } = useApp();
  const phone = PHONES.find(p => p.id === Number(id));

  const colors = phone ? getPhoneColors(phone) : [];
  const storages = phone ? getPhoneStorages(phone) : [];

  const [selectedColor, setSelectedColor] = useState(colors[0] || { name: 'Standard', value: '#ccc' });
  const [selectedStorage, setSelectedStorage] = useState(storages[0] || { size: '128GB', priceBump: 0 });

  useEffect(() => {
    if (phone) {
      addRecent(phone.id);
      const cols = getPhoneColors(phone);
      const stors = getPhoneStorages(phone);
      setSelectedColor(cols[0]);
      setSelectedStorage(stors[0]);
    }
  }, [phone]);

  if (!phone) {
    return (
      <div className="container my-5 text-center py-5">
        <h4>Phone not found</h4>
        <Link to="/catalog" className="btn btn-dark" style={{ borderRadius: 8 }}>{t('back', lang)}</Link>
      </div>
    );
  }

  const currentPrice = phone.price + selectedStorage.priceBump;

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

          {/* Color Selector */}
          <div className="mb-4">
            <h6 className="fw-bold mb-2" style={{ fontSize: 14 }}>
              {lang === 'ru' ? 'Выберите цвет:' : 'Select Color:'}
            </h6>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              {colors.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  title={c.name}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: c.value,
                    border: selectedColor.name === c.name ? '3px solid #2563eb' : '1px solid #ced4da',
                    boxShadow: selectedColor.name === c.name ? '0 0 8px rgba(37,99,235,0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                />
              ))}
              <span className="small text-muted ms-2 fw-semibold" style={{ fontSize: 13 }}>{selectedColor.name}</span>
            </div>
          </div>

          {/* Storage Selector */}
          <div className="mb-4">
            <h6 className="fw-bold mb-2" style={{ fontSize: 14 }}>
              {lang === 'ru' ? 'Выберите память:' : 'Select Storage:'}
            </h6>
            <div className="d-flex gap-2 flex-wrap">
              {storages.map(s => {
                const isSelected = selectedStorage.size === s.size;
                return (
                  <button
                    key={s.size}
                    onClick={() => setSelectedStorage(s)}
                    className={`btn btn-sm d-flex flex-column align-items-center justify-content-center ${isSelected ? 'btn-accent' : 'btn-outline-dark'}`}
                    style={{
                      borderRadius: 10,
                      padding: '6px 16px',
                      minWidth: 90,
                      transition: 'all 0.2s'
                    }}
                  >
                    <span className="fw-bold" style={{ fontSize: 13 }}>{s.size}</span>
                    <span className="small fw-normal mt-0.5" style={{ fontSize: 9, opacity: 0.8 }}>
                      {s.priceBump > 0 ? `+${fmtPrice(s.priceBump)}` : (lang === 'ru' ? 'Базовая' : 'Base')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
            <span className="fw-bold fs-3">{fmtPrice(currentPrice)}</span>
            <button className="btn btn-accent px-4 py-2" onClick={() => addToCart(phone, { color: selectedColor.name, storage: selectedStorage.size, price: currentPrice })} style={{ borderRadius: 8 }}>
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

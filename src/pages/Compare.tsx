import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data';
import { loadCompare, toggleCompare, clearCompare } from '../utils/compare';

export default function Compare() {
  const { lang, fmtPrice, addToCart, toast } = useApp();
  const [phones, setPhones] = useState(loadCompare);

  const remove = (id: number) => {
    toggleCompare(id);
    setPhones(loadCompare());
    toast('Removed from compare', 'success');
  };

  if (!phones.length) {
    return (
      <div className="container my-5 text-center py-5">
        <i className="bi bi-arrows-expand" style={{ fontSize: 64, color: '#ccc' }}></i>
        <h4 className="mt-3">No phones to compare</h4>
        <p style={{ color: '#888' }}>Add phones from their detail page</p>
        <Link to="/catalog" className="btn btn-dark" style={{ borderRadius: 8 }}>Go to Catalog</Link>
      </div>
    );
  }

  const specs = ['Display', 'Chip', 'Camera', 'Battery'];

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Compare Phones</h2>
        <button className="btn btn-outline-dark btn-sm" style={{ borderRadius: 8 }} onClick={() => { clearCompare(); setPhones([]); toast('Compare list cleared', 'success'); }}>Clear</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered align-middle" style={{ minWidth: 600 }}>
          <thead>
            <tr className="text-center">
              <th style={{ width: 120, background: '#f8f9fa' }}></th>
              {phones.map(p => (
                <th key={p.id} style={{ background: '#f8f9fa', minWidth: 200 }}>
                  <img src={p.img} alt={p.name} style={{ height: 120, objectFit: 'contain', maxWidth: '100%', marginBottom: 8 }}
                    referrerPolicy="no-referrer" onError={e => (e.target as HTMLElement).style.display = 'none'} />
                  <h6 className="fw-bold mb-1">{p.name}</h6>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => remove(p.id)}><i className="bi bi-x"></i></button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-semibold" style={{ background: '#f8f9fa' }}>Price</td>
              {phones.map(p => (
                <td key={p.id} className="text-center fw-bold">{fmtPrice(p.price)}</td>
              ))}
            </tr>
            {specs.map(s => (
              <tr key={s}>
                <td className="fw-semibold" style={{ background: '#f8f9fa' }}>{s}</td>
                {phones.map(p => {
                  const spec = p.specs.find(x => x.label === s);
                  return <td key={p.id} className="text-center">{spec ? spec.value : '—'}</td>;
                })}
              </tr>
            ))}
            <tr>
              <td style={{ background: '#f8f9fa' }}></td>
              {phones.map(p => (
                <td key={p.id} className="text-center">
                  <button className="btn btn-accent btn-sm w-100" onClick={() => { addToCart(p); toast(`${p.name} +`, 'success'); }}>
                    <i className="bi bi-cart-plus"></i> {t('addToCart', lang)}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

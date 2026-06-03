import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PhoneCard from '../components/PhoneCard';
import { useApp } from '../context/AppContext';
import { PHONES, BRANDS, CURRENCIES, t } from '../data';

const ALL_STORAGE = ['all', ...new Set(PHONES.map(p => p.storage))].sort((a, b) => {
  if (a === 'all') return -1;
  if (b === 'all') return 1;
  return parseInt(a) - parseInt(b);
});

export default function Catalog() {
  const { lang, currency } = useApp();
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('brand') || 'all';
  const [brand, setBrand] = useState<string>(initial);
  const [query, setQuery] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [storage, setStorage] = useState<string>('all');

  const rate = CURRENCIES[currency] ?? 1;
  const byBrand = brand === 'all' ? PHONES : PHONES.filter(p => p.brand === brand);
  const searched = query ? byBrand.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : byBrand;
  const byStorage = storage === 'all' ? searched : searched.filter(p => p.storage === storage);
  const list = byStorage.filter(p => {
    const convertedPrice = p.price * rate;
    if (priceMin && convertedPrice < Number(priceMin)) return false;
    if (priceMax && convertedPrice > Number(priceMax)) return false;
    return true;
  });

  const clearFilters = () => { setPriceMin(''); setPriceMax(''); setQuery(''); setBrand('all'); setStorage('all'); };

  const hasFilters = priceMin || priceMax || query || brand !== 'all' || storage !== 'all';

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="fw-bold mb-0">{t('catalog', lang)}</h2>
        {hasFilters && <button className="btn btn-sm btn-outline-dark" style={{ borderRadius: 20 }} onClick={clearFilters}>
          <i className="bi bi-x"></i> Clear filters</button>}
      </div>

      <div className="d-flex flex-wrap gap-3 mb-4">
        <input type="text" className="form-control" style={{ maxWidth: 300, flex: '1 1 200px' }}
          placeholder={t('search', lang)} value={query}
          onChange={e => setQuery(e.target.value)} />
        <div className="d-flex gap-2 align-items-center">
          <input type="number" className="form-control" style={{ width: 110 }}
            placeholder={t('priceFrom', lang)} value={priceMin}
            onChange={e => setPriceMin(e.target.value)} />
          <span style={{ color: '#888' }}>—</span>
          <input type="number" className="form-control" style={{ width: 110 }}
            placeholder={t('priceTo', lang)} value={priceMax}
            onChange={e => setPriceMax(e.target.value)} />

        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
        <button className={`btn btn-outline-dark filter-btn${brand === 'all' ? ' active' : ''}`} onClick={() => setBrand('all')}>{t('all', lang)}</button>
        {BRANDS.map(b => (
          <button key={b} className={`btn btn-outline-dark filter-btn${brand === b ? ' active' : ''}`}
            onClick={() => setBrand(b)} style={{ textTransform: 'capitalize' }}>{b}</button>
        ))}
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
        {ALL_STORAGE.map(s => (
          <button key={s} className={`btn btn-outline-dark filter-btn${storage === s ? ' active' : ''}`}
            onClick={() => setStorage(s)}>{s === 'all' ? t('all', lang) : s}</button>
        ))}
      </div>

      {!list.length ? (
        <div className="text-center py-5">
          <i className="bi bi-search" style={{ fontSize: 48, color: '#ccc' }}></i>
          <p className="mt-3" style={{ color: '#888' }}>No phones match your filters</p>
          <button className="btn btn-outline-dark btn-sm" style={{ borderRadius: 20 }} onClick={clearFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="row g-4">
          {list.map(p => <PhoneCard key={p.id} phone={p} />)}
        </div>
      )}
    </section>
  );
}

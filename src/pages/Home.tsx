import { Link } from 'react-router-dom';
import PhoneCard from '../components/PhoneCard';
import { useApp } from '../context/AppContext';
import { PHONES, BRANDS, t } from '../data';
import { useScrollReveal } from '../utils/scrollReveal';
import { loadRecent } from '../utils/recent';

export default function Home() {
  const { lang } = useApp();
  useScrollReveal();
  const popular = PHONES.filter(p => p.id <= 8);
  const recent = loadRecent();

  return (
    <>
      <section className="hero-section text-center py-5">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-blob hero-blob-3"></div>
        <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold mb-3 text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{t('heroTitle', lang)}</h1>
          <p className="lead mb-4 mx-auto text-white-50" style={{ maxWidth: 600, textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>{t('heroSub', lang)}</p>
          <Link to="/catalog" className="btn btn-light btn-lg px-5 py-3 fw-semibold shadow-sm hero-cta-btn" style={{ borderRadius: 30 }}>
            <i className="bi bi-arrow-right"></i> {t('heroBtn', lang)}
          </Link>
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <h2 className="text-center mb-4 fw-bold">{t('whyTitle', lang)}</h2>
        <div className="row g-4">
          {[
            { icon: 'bi-shield-check', title: t('why1', lang), desc: t('why1desc', lang) },
            { icon: 'bi-truck', title: t('why2', lang), desc: t('why2desc', lang) },
            { icon: 'bi-wallet2', title: t('why3', lang), desc: t('why3desc', lang) },
            { icon: 'bi-headset', title: t('why4', lang), desc: t('why4desc', lang) },
          ].map((item, i) => (
            <div key={i} className="col-6 col-lg-3 text-center scroll-scale">
              <div className="card border-0 shadow-sm p-4 h-100 feature-card">
                <div className="feature-icon" style={{ background: '#e0f2fe', color: '#2563eb' }}>
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h6 className="fw-bold mb-1">{item.title}</h6>
                <small style={{ color: '#888' }}>{item.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <h2 className="text-center mb-4 fw-bold">{t('newTitle', lang)}</h2>
        <div className="row g-4">
          {[
            { phone: PHONES[0], title: t('new1', lang), desc: t('new1desc', lang) },
            { phone: PHONES[6], title: t('new2', lang), desc: t('new2desc', lang) },
            { phone: PHONES[16], title: t('new3', lang), desc: t('new3desc', lang) },
          ].map((item, i) => (
            <div key={i} className="col-md-4 scroll-scale">
              <Link to={`/phone/${item.phone.id}`} className="card border-0 h-100 overflow-hidden" style={{ textDecoration: 'none', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}>
                <div style={{ padding: '20px', textAlign: 'center', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.phone.img} alt={item.phone.name}
                    style={{ height: '100%', maxHeight: 220, objectFit: 'contain', maxWidth: '100%', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.1))' }}
                    referrerPolicy="no-referrer" onError={e => (e.target as HTMLElement).style.display = 'none'} />
                </div>
                <div className="p-3">
                  <small style={{ color: '#2563eb', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1 }}>{item.phone.brand}</small>
                  <h6 className="fw-bold mt-1" style={{ color: '#111' }}>{item.title}</h6>
                  <p style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>{item.desc}</p>
                  <span className="fw-semibold" style={{ color: '#2563eb', fontSize: 13 }}>{t('newBtn', lang)} →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <h2 className="text-center mb-4 fw-bold">{t('brandsTitle', lang)}</h2>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {BRANDS.map(b => (
            <Link key={b} to={`/catalog?brand=${b}`} className="btn btn-outline-dark px-4" style={{ borderRadius: 20, textTransform: 'capitalize' }}>{b}</Link>
          ))}
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <div className="ad-banner text-white text-center" style={{ padding: '40px 20px' }}>
          <div className="position-absolute" style={{ top: '-50px', left: '-50px', width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }}></div>
          <div className="position-absolute" style={{ bottom: '-40px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }}></div>
          <div className="position-relative">
            <h3 className="fw-bold mb-2">{t('bannerTitle', lang)}</h3>
            <p className="mb-3" style={{ color: 'rgba(255,255,255,.7)' }}>{t('bannerText', lang)}</p>
            <Link to="/catalog" className="btn btn-light px-5 py-2 fw-semibold" style={{ borderRadius: 30, color: '#1d4ed8' }}>{t('bannerBtn', lang)}</Link>
          </div>
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <h2 className="text-center mb-4 fw-bold">{t('popular', lang)}</h2>
        <div className="row g-4">
          {popular.map(p => <PhoneCard key={p.id} phone={p} />)}
        </div>
        <div className="text-center mt-4">
          <Link to="/catalog" className="btn btn-outline-accent btn-lg" style={{ borderRadius: 30 }}>{t('allCatalog', lang)}</Link>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="container my-5 scroll-fade">
          <h2 className="text-center mb-4 fw-bold">{t('recent', lang)}</h2>
          <div className="row g-4">
            {recent.slice(0, 4).map(p => <PhoneCard key={p.id} phone={p} />)}
          </div>
        </section>
      )}
    </>
  );
}

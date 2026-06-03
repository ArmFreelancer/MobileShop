import { useApp } from '../context/AppContext';
import { t } from '../data';
import { useScrollReveal } from '../utils/scrollReveal';

const team = [
  { name: 'Arman Sargsyan', role: 'CEO & Founder', img: 'https://ui-avatars.com/api/?name=Arman+Sargsyan&background=2563eb&color=fff&size=128' },
  { name: 'Lilit Hovhannisyan', role: 'Marketing Director', img: 'https://ui-avatars.com/api/?name=Lilit+Hovhannisyan&background=1d4ed8&color=fff&size=128' },
  { name: 'Davit Petrosyan', role: 'Technical Lead', img: 'https://ui-avatars.com/api/?name=Davit+Petrosyan&background=2563eb&color=fff&size=128' },
  { name: 'Mariam Grigoryan', role: 'Customer Support', img: 'https://ui-avatars.com/api/?name=Mariam+Grigoryan&background=1d4ed8&color=fff&size=128' },
];

export default function About() {
  const { lang } = useApp();
  useScrollReveal();

  return (
    <>
      <section className="text-center py-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2744, #1e3a8a)' }}>
        <div className="position-absolute" style={{ top: '-60px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }}></div>
        <div className="position-absolute" style={{ bottom: '-40px', left: '-30px', width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }}></div>
        <div className="container position-relative py-3">
          <h1 className="fw-bold text-white">{t('about', lang)}</h1>
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <div className="row g-5 align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">{t('aboutTitle', lang)}</h2>
            <p style={{ color: '#555', lineHeight: 1.8 }}>{t('aboutDesc', lang)}</p>
            <p style={{ color: '#555', lineHeight: 1.8 }}>{t('aboutMissionDesc', lang)}</p>
          </div>
          <div className="col-md-6 text-center">
            <div className="bg-light-custom" style={{ borderRadius: 20, padding: 40 }}>
              <i className="bi bi-phone" style={{ fontSize: 80, color: '#2563eb' }}></i>
              <h3 className="fw-bold mt-3">PhoneMarket</h3>
              <p style={{ color: '#888' }}>Since 2020</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <h2 className="text-center fw-bold mb-5">{t('aboutTeam', lang)}</h2>
        <div className="row g-4 justify-content-center">
          {team.map((m, i) => (
            <div key={i} className="col-6 col-md-3 text-center scroll-scale">
              <div className="card border-0 shadow-sm p-4 h-100">
                <img src={m.img} alt={m.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px' }} />
                <h6 className="fw-bold mb-1">{m.name}</h6>
                <small style={{ color: '#888' }}>{m.role}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container my-5 scroll-fade">
        <div className="card border-0 shadow-sm p-5 text-center bg-light-custom">
          <h2 className="fw-bold mb-4">{t('aboutContact', lang)}</h2>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            <div><i className="bi bi-geo-alt" style={{ color: '#2563eb' }}></i> {t('aboutAddress', lang)}</div>
            <div><i className="bi bi-telephone" style={{ color: '#2563eb' }}></i> {t('aboutPhone', lang)}</div>
            <div><i className="bi bi-envelope" style={{ color: '#2563eb' }}></i> {t('aboutEmail', lang)}</div>
          </div>
        </div>
      </section>
    </>
  );
}

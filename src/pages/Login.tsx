import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data';
import { register, login as authLogin } from '../utils/auth';

export default function Login() {
  const { lang, toast, loginUser } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const [le, setLe] = useState('');
  const [lp, setLp] = useState('');
  const [rn, setRn] = useState('');
  const [re, setRe] = useState('');
  const [rp, setRp] = useState('');
  const [rc, setRc] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!le || !lp) return toast('Fill fields', 'error');
    const r = authLogin(le, lp);
    if (r.ok) { loginUser(); toast(t('loginSuccess', lang), 'success'); setTimeout(() => navigate('/'), 500); }
    else toast(r.error || t('loginError', lang), 'error');
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!rn || !re || !rp) return toast('Fill fields', 'error');
    if (rp !== rc) return toast('Passwords mismatch', 'error');
    if (rp.length < 4) return toast('Password too short', 'error');
    const r = register(rn, re, rp);
    if (r.ok) { loginUser(); toast(t('registerSuccess', lang), 'success'); setTimeout(() => navigate('/'), 500); }
    else toast(r.error || t('registerError', lang), 'error');
  };

  return (
    <div className="container py-5" style={{ maxWidth: 440 }}>
      <div className="card border-0 shadow-sm p-4">
        <h4 className="text-center mb-4 fw-bold">{tab === 'login' ? t('loginBtn', lang) : t('registerBtn', lang)}</h4>

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-medium" style={{ color: '#333', fontSize: 14 }}>{t('email', lang)}</label>
              <input type="email" className="form-control" value={le} onChange={e => setLe(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium" style={{ color: '#333', fontSize: 14 }}>{t('password', lang)}</label>
              <input type="password" className="form-control" value={lp} onChange={e => setLp(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-accent w-100" style={{ borderRadius: 8 }}>{t('loginBtn', lang)}</button>
            <p className="text-center mt-3 mb-0" style={{ color: '#888', fontSize: 14 }}>
              {t('noAccount', lang)} <button type="button" className="btn btn-link p-0" onClick={() => setTab('register')} style={{ color: '#2563eb', verticalAlign: 'baseline', textDecoration: 'none' }}>{t('signUp', lang)}</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label fw-medium" style={{ color: '#333', fontSize: 14 }}>{t('name', lang)}</label>
              <input type="text" className="form-control" value={rn} onChange={e => setRn(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium" style={{ color: '#333', fontSize: 14 }}>{t('email', lang)}</label>
              <input type="email" className="form-control" value={re} onChange={e => setRe(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium" style={{ color: '#333', fontSize: 14 }}>{t('password', lang)}</label>
              <input type="password" className="form-control" value={rp} onChange={e => setRp(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium" style={{ color: '#333', fontSize: 14 }}>{t('confirmPass', lang)}</label>
              <input type="password" className="form-control" value={rc} onChange={e => setRc(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-accent w-100" style={{ borderRadius: 8 }}>{t('registerBtn', lang)}</button>
            <p className="text-center mt-3 mb-0" style={{ color: '#888', fontSize: 14 }}>
              {t('haveAccount', lang)} <button type="button" className="btn btn-link p-0" onClick={() => setTab('login')} style={{ color: '#2563eb', verticalAlign: 'baseline', textDecoration: 'none' }}>{t('loginBtn', lang)}</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

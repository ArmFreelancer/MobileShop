import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
      {toasts.map(t => (
        <div key={t.id} className="toast align-items-center text-white border-0 show" role="alert"
          style={{ background: t.type === 'success' ? '#000' : '#e00', color: '#fff' }}>
          <div className="d-flex">
            <div className="toast-body fw-semibold">{t.text}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" style={{ filter: 'invert(1)' }}></button>
          </div>
        </div>
      ))}
    </div>
  );
}

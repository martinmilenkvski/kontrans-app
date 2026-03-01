import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Give the browser the VIP wristband
    localStorage.setItem('auth', 'true');
    // Send them into the vault
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">Admin Vault</h1>
        <button 
          onClick={handleLogin}
          className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition-all hover:-translate-y-1 shadow-md"
        >
          Unlock Vault
        </button>
      </div>
    </div>
  );
}

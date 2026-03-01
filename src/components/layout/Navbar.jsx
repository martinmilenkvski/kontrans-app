import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-red-500">KON-TRANS</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-red-400">Home</Link>
        <Link to="/admin" className="hover:text-red-400">Admin Login</Link>
      </div>
    </nav>
  );
}

import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Rip off the VIP wristband
    navigate('/'); // Kick them to the public home page
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold text-red-500 border-b border-slate-700">
          ADMIN PANEL
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">📊 Dashboard</Link>
          <Link to="/admin/invoices" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">📄 Invoices</Link>
          <Link to="/admin/quotes" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">📝 Quotes</Link>
          <Link to="/admin/attendance" className="block p-3 rounded-lg hover:bg-slate-800 transition-colors">📅 Attendance</Link>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={handleLogout}
            className="w-full bg-slate-800 text-red-400 p-3 rounded-lg font-bold hover:bg-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

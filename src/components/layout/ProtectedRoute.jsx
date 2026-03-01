import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Check if the browser has the 'auth' wristband
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  // If yes, render the protected pages (<Outlet />). If no, kick them to /login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

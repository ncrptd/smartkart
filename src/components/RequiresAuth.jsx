import { Navigate, useLocation } from 'react-router-dom';

export default function RequiresAuth({ children }) {
  const isLoggedIn = localStorage.getItem('user');

  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

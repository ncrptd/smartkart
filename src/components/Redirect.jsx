import { Navigate, useLocation } from 'react-router-dom';
export default function Redirect({ children }) {
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location }} />;
}

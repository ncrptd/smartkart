import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import { useDataDispatch } from '../contexts/DataContext';
import { ACTIONS } from '../reducer/dataReducer';
import { loggedOut } from '../alerts/cartAlerts';
export default function ProfileDetails() {
  const dispatchAuth = useAuthDispatch();
  const dispatchData = useDataDispatch();

  const navigate = useNavigate();
  const { userDetails } = useAuth();
  return (
    <div>
      <h1>ProfileDetails</h1>
      <h2>Hello {userDetails.firstName}</h2>
      <button
        className="bg-pink-600 text-white
           py-1 px-4   shadow-2xl"
        onClick={() => {
          localStorage.clear();
          dispatchAuth({ type: ACTIONS_AUTH.LOGOUT });
          dispatchData({ type: ACTIONS.CLEAR_CART });
          navigate('/');
          loggedOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}

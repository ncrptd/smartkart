import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';

export default function ProfileDetails() {
  const dispatch = useAuthDispatch();
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
          dispatch({ type: ACTIONS_AUTH.LOGOUT });
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
  );
}

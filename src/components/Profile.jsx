import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { useDataDispatch } from '../contexts/DataContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import { ACTIONS } from '../reducer/dataReducer';
import { loggedOut } from '../alerts/alerts';
export default function Profile() {
  const dispatchAuth = useAuthDispatch();
  const dispatchData = useDataDispatch();

  const navigate = useNavigate();
  const { state } = useAuth();
  const { userDetails } = state;
  const email = userDetails?.email;
  const fullName = userDetails?.firstName + ' ' + userDetails?.lastName;
  return (
    <div className="flex flex-col gap-6 shadow-xl p-4 w-full  rounded-lg md:text-center">
      <h2 className=" font-semibold text-center text-2xl">Profile Details</h2>
      <div className="text-2xl ">
        <p>
          <span className="font-bold"> Full Name: </span>{' '}
          <span> {fullName}</span>
        </p>
        <p className="mt-4">
          <span className="font-bold">Email: </span> {email}
        </p>
      </div>
      <button
        className="bg-pink-600 text-white
             py-1 px-4 w-2/4 mx-auto  shadow-2xl font-bold"
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

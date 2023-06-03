import { useNavigate } from 'react-router-dom';
import CheckoutDetailsCard from '../components/CheckoutDetailsCard';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import { useData } from '../contexts/DataContext';
import { useEffect } from 'react';
export default function Checkout() {
  const { state } = useData();
  const { cart } = state;

  const { state: authState } = useAuth();
  const dispatch = useAuthDispatch();
  const { addressList, selectedAddress } = authState;
  const addressSelectionHandler = (address) => {
    dispatch({
      type: ACTIONS_AUTH.SELECT_ADDRESS,
      payload: { selectedAddress: address },
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (cart.length < 1) {
      navigate('/');
    }
  }, [cart.length, navigate]);
  return (
    <main className="p-4">
      <h1 className="text-center uppercase font-bold mb-4">Checkout</h1>
      {cart.length >= 1 && (
        <>
          <div className="container mx-auto md:flex justify-between md:py-6 md:px-10 ">
            <div className="w-full md:w-3/6 md:mr-6">
              {addressList.map((address) => (
                <div
                  className="shadow-md p-6 flex flex-col gap-2"
                  key={address?.id}
                >
                  <label htmlFor={address?.id}>
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        name="address"
                        value={address}
                        id={address?.id}
                        checked={selectedAddress?.id === address?.id}
                        onChange={() => addressSelectionHandler(address)}
                      />
                      <p className="font-semibold">{address?.name}</p>
                    </div>
                    <p className="text-sm">
                      <span>{address?.address}, </span>
                      <span>{address?.city}, </span>
                      <span>{address?.state}, </span>
                      <span>{address?.pincode}, </span>
                      <span>{address?.country}. </span>
                    </p>
                    <p className="text-sm">
                      <span>Phone Number: {address?.mobile}, </span>
                      <span>Alternate Number: {address?.alternateMobile}</span>
                    </p>
                  </label>
                </div>
              ))}
            </div>
            <div className="w-full mt-6 md:w-3/6 ">
              <CheckoutDetailsCard />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';

export default function Address() {
  const { state } = useAuth();
  const dispatch = useAuthDispatch();
  const { showAddressForm, addressList } = state;
  return (
    <div className="p-4 shadow-sm rounded-lg w-full">
      {showAddressForm ? (
        <AddressForm />
      ) : (
        <>
          <h1 className="font-semibold text-center text-2xl">Address</h1>

          <button
            onClick={() => {
              dispatch({
                type: ACTIONS_AUTH.FILL_EDIT_ADDRESS_FORM,
                payload: { form: null },
              });
              dispatch({
                type: ACTIONS_AUTH.SHOW_ADDRESS_FORM,
                payload: { flag: true },
              });
            }}
            className="uppercase mt-4 font-bold text-pink-500 hover:shadow-lg"
          >
            + Add new Address
          </button>
          <div>
            {addressList.map((address) => (
              <AddressCard address={address} key={address?.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

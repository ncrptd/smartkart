import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';

export default function AddressCard({ address }) {
  const { handleAddressDelete } = useAuth();
  const dispatch = useAuthDispatch();
  return (
    <div className="flex flex-col gap-2 font-sm bg-slate-100 rounded-md mt-4 p-4">
      <p className="font-bold text-2xl">{address?.name}</p>
      <p>{address?.address}</p>
      <p>{address?.city}</p>
      <p>{address?.state}</p>
      <p>{address?.pincode}</p>
      <p>
        <span className="font-semibold">Phone Number: </span> {address?.mobile}
      </p>
      <p>
        <span className="font-semibold">Alternate Phone Number: </span>{' '}
        {address?.alternateMobile}
      </p>
      <div>
        {' '}
        <button
          onClick={() => {
            dispatch({
              type: ACTIONS_AUTH.FILL_EDIT_ADDRESS_FORM,
              payload: { form: address },
            });
            dispatch({
              type: ACTIONS_AUTH.SHOW_ADDRESS_FORM,
              payload: { flag: true },
            });
          }}
          className="px-2 py-1 border-2 rounded-lg border-pink-500 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleAddressDelete(address)}
          className="px-2 py-1 border-2 rounded-lg border-red-500 text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

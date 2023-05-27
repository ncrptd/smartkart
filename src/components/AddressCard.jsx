import { useAuth } from '../contexts/AuthContext';

export default function AddressCard({ address }) {
  const { handleAddressUpdate, handleAddressDelete } = useAuth();
  return (
    <div className="flex flex-col gap-2 font-semibold">
      <p className="fot-bold text-2xl">{address?.name}</p>
      <p>{address?.address}</p>
      <p>{address?.pincode}</p>
      <p>Phone Number {address?.mobile}</p>
      <button onClick={() => handleAddressUpdate(address)}>Edit</button>
      <button onClick={() => handleAddressDelete(address)}>Delete</button>
    </div>
  );
}

import { useAuth } from '../contexts/AuthContext';
import AddressCard from './AddressCard';

export default function Address() {
  const { addressList } = useAuth();
  console.log(addressList);
  return (
    <div className="p-4 shadow-xl rounded-lg w-full">
      <h1 className="font-semibold text-center text-2xl">Address</h1>
      <div>
        {addressList.map((address) => (
          <AddressCard address={address} />
        ))}
      </div>
    </div>
  );
}

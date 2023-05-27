import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';

export default function Address() {
  const [address, setAddress] = useState({
    name: '',
    mobileNo: '',
    pincode: '',
    city: '',
    adderss: '',
    alternateMobile: '',
    state: '',
  });
  const { state } = useAuth();
  const { addressList } = state;
  console.log(addressList);
  return (
    <div className="p-4 shadow-sm rounded-lg w-full">
      <h1 className="font-semibold text-center text-2xl">Address</h1>
      <button className="uppercase mt-4 font-bold text-pink-500 hover:shadow-lg">
        + Add new Address
      </button>
      <AddressForm />
      <div>
        {addressList.map((address) => (
          <AddressCard address={address} />
        ))}
      </div>
    </div>
  );
}

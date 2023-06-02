import { useState } from 'react';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { v4 as uuid } from 'uuid';
import { ACTIONS_AUTH } from '../reducer/authReducer';
const initialForm = {
  name: '',
  mobile: '',
  pincode: '',
  city: '',
  address: '',
  country: '',
  alternateMobile: '',
  state: '',
};
const dummyAddress = {
  name: 'Vicki McDermott',
  mobile: 1293452481,
  pincode: '46566',
  city: 'South Brayanberg',
  address: '579 Aracely Pine',
  country: 'U.S.A',
  alternateMobile: 4878794411,
  state: 'Massachusetts',
};

export default function AddressForm() {
  const { state: authState, handleNewAddress, handleAddressEdit } = useAuth();
  const { editAddressForm } = authState;

  const dispatch = useAuthDispatch();
  const [addressData, setAddressData] = useState(
    editAddressForm || initialForm
  );
  const {
    name,
    mobile,
    pincode,
    city,
    address,
    country,
    alternateMobile,
    state,
  } = addressData;
  const inputStyle = `
    p-2 rounded-lg  placeholder:text-base
    `;
  const handleAddressData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddressData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const addressD = { ...addressData, id: uuid() };
    if (editAddressForm) {
      handleAddressEdit(addressData);
    } else {
      handleNewAddress(addressD);
    }
    dispatch({
      type: ACTIONS_AUTH.SHOW_ADDRESS_FORM,
      payload: { flag: false },
    });
    dispatch({
      type: ACTIONS_AUTH.FILL_EDIT_ADDRESS_FORM,
      payload: { form: null },
    });
  };
  return (
    <form
      className="w-full shadow-2xl flex flex-col gap-2 p-4 rounded-2xl bg-slate-100"
      onSubmit={handleFormSubmit}
    >
      <h2 className="text-center font-bold text-pink-500">Add New Address</h2>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        placeholder="Name"
        className={inputStyle}
        onChange={handleAddressData}
        required
        autoFocus
      />
      <input
        type="text"
        name="address"
        id="address"
        value={address}
        placeholder="House No, Road, Colony"
        className={inputStyle}
        onChange={handleAddressData}
        required
      />
      <input
        type="text"
        name="city"
        id="city"
        value={city}
        placeholder="City"
        className={inputStyle}
        onChange={handleAddressData}
        required
      />
      <input
        type="text"
        name="state"
        id="state"
        value={state}
        placeholder="State"
        className={inputStyle}
        onChange={handleAddressData}
        required
      />
      <input
        type="text"
        name="country"
        id="country"
        value={country}
        placeholder="Country"
        className={inputStyle}
        onChange={handleAddressData}
        required
      />
      <input
        type="text"
        name="pincode"
        id="pincode"
        value={pincode}
        placeholder="Pin Code"
        className={inputStyle}
        onChange={handleAddressData}
        required
      />
      <input
        type="tel"
        name="mobile"
        id="mobile"
        value={mobile}
        placeholder="Mobile Number"
        className={inputStyle}
        onChange={handleAddressData}
        required
      />
      <input
        type="tel"
        name="alternateMobile"
        id="alternateMobile"
        value={alternateMobile}
        placeholder="Alternate Mobile no."
        className={inputStyle}
        onChange={handleAddressData}
        required
      />
      <div className="flex gap-2 py-2">
        <button
          className="bg-pink-500 text-white rounded-md px-2 py-1"
          type="submit"
        >
          Save
        </button>

        <button
          className="bg-red-500 text-white rounded-md px-2 py-1"
          onClick={() => {
            console.log(addressData);
            dispatch({
              type: ACTIONS_AUTH.FILL_EDIT_ADDRESS_FORM,
              payload: { form: null },
            });
            dispatch({
              type: ACTIONS_AUTH.SHOW_ADDRESS_FORM,
              payload: { flag: false },
            });
          }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white rounded-md px-2 py-1"
          onClick={(e) => {
            e.preventDefault();
            setAddressData(dummyAddress);
          }}
        >
          Fill With Dummy Address
        </button>
      </div>
    </form>
  );
}

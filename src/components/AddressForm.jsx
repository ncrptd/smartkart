import React from 'react';

export default function AddressForm() {
  const inputStyle = `
    p-2 rounded-lg  placeholder:text-base
    `;
  return (
    <form className="w-full shadow-2xl flex flex-col gap-2 p-4 rounded-2xl bg-slate-100">
      <h2 className="text-center font-bold">Add New Address</h2>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        className={inputStyle}
      />
      <input
        type="text"
        name="address"
        id="address"
        placeholder="House No, Road, Colony"
        className={inputStyle}
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="City"
        className={inputStyle}
      />
      <input
        type="text"
        name="state"
        id="state"
        placeholder="State"
        className={inputStyle}
      />
      <input
        type="text"
        name="country"
        id="country"
        placeholder="Country"
        className={inputStyle}
      />
      <input
        type="text"
        name="pincode"
        id="pincode"
        placeholder="Pin Code"
        className={inputStyle}
      />
      <input
        type="tel"
        name="mobile"
        id="mobile"
        placeholder="Mobile Number"
        className={inputStyle}
      />
      <input
        type="tel"
        name="mobile"
        id="mobile"
        placeholder="Mobile no."
        className={inputStyle}
      />
      <div>
        <button type="submit" className="bg-pink-500 text-white rounded-md p-2">
          Save
        </button>
      </div>
      <button></button>
    </form>
  );
}

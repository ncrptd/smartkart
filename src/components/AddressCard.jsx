export default function AddressCard({ address }) {
  return (
    <div>
      <p className="fot-bold text-2xl">{address?.name}</p>
      <p>{address?.address}</p>
      <p>{address?.pincode}</p>
      <p>Phone Number {address?.mobile}</p>
    </div>
  );
}

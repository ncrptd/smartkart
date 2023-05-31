import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function CheckoutDetailsCard() {
  const { state } = useData();
  const { state: authState } = useAuth();
  const { selectedAddress } = authState;
  console.log('card', selectedAddress);
  const { cart } = state;
  const price = Number(
    cart
      ?.reduce((acc, curr) => (acc += Number(curr.price) * Number(curr.qty)), 0)
      .toFixed(2)
  );

  const originalPrice = Number(
    cart.reduce(
      (acc, curr) => (acc += Number(curr.original_price) * Number(curr.qty)),
      0
    )
  ).toFixed(2);
  const totalDiscount = (originalPrice - price).toFixed(2);
  const deliveryCharge = 5;
  const totalPrice = (price + deliveryCharge).toFixed(2);
  return (
    <div className="shadow-lg p-4">
      <hr />
      <p className="uppercase font-bold text-center my-4">order details</p>
      <hr />
      <div className="flex justify-between font-bold ">
        <span>Item</span> <span>Qty</span>
      </div>
      <div>
        {cart.map((item) => (
          <p
            className="flex justify-between text-base font-semibold"
            key={item._id}
          >
            <span>{item?.title}</span>
            <span>{item?.qty}</span>
          </p>
        ))}
      </div>
      <hr />
      <p className="uppercase font-bold text-center my-4">price details</p>
      <hr />
      <div className="flex flex-col gap-2 font-semibold">
        <p className="flex justify-between">
          <span>Price ({cart?.length} items)</span>
          <span>&#36;{originalPrice}</span>
        </p>
        <p className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-&#36;{totalDiscount}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Charges</span>
          <span>&#36;{deliveryCharge}</span>
        </p>
        <p className="flex justify-between font-bold">
          <span>Total Amount</span>
          <span>&#36;{totalPrice}</span>
        </p>
        <hr />
        <p className="uppercase font-bold text-center my-4">Deliver to</p>
        <hr />

        <div className="text-sm">
          <p className="font-semibold">{selectedAddress?.name}</p>
          <span>{selectedAddress?.address}, </span>
          <span>{selectedAddress?.city}, </span>
          <span>{selectedAddress?.state}, </span>
          <span>{selectedAddress?.pincode}, </span>
          <span>{selectedAddress?.country}. </span>
        </div>
        <p className="text-sm">
          <span>Phone Number: {selectedAddress?.mobile}, </span>
          <span>Alternate Number: {selectedAddress?.alternateMobile}</span>
        </p>
      </div>
    </div>
  );
}

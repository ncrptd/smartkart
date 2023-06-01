import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { selectAddress, noAddress } from '../alerts/alerts';
import { useNavigate } from 'react-router-dom';
export default function CheckoutDetailsCard() {
  const navigate = useNavigate();

  const { state, removeFromCart } = useData();
  const { cart } = state;

  const { state: authState } = useAuth();
  const { addressList, selectedAddress, orderedItems } = authState;

  const price = Number(
    orderedItems
      ?.reduce((acc, curr) => (acc += Number(curr.price) * Number(curr.qty)), 0)
      .toFixed(2)
  );

  const originalPrice = Number(
    orderedItems.reduce(
      (acc, curr) => (acc += Number(curr.original_price) * Number(curr.qty)),
      0
    )
  ).toFixed(2);
  const totalDiscount = (originalPrice - price).toFixed(2);
  const deliveryCharge = 5;
  const totalPrice = (price + deliveryCharge).toFixed(2);
  const orderHandler = () => {
    if (addressList.length < 1) {
      noAddress();
      navigate('/profileDetails');
    } else if (!selectedAddress) {
      selectAddress();
    } else {
      cart.forEach((item) => removeFromCart(item._id));
      navigate('/orderSummary');
    }
  };
  return (
    <div className="shadow-2xl p-4">
      <hr />
      <p className="uppercase font-bold text-center my-4">order details</p>
      <hr />
      <div className="flex justify-between font-bold ">
        <span>Item</span> <span>Qty</span>
      </div>
      <div>
        {orderedItems.map((item) => (
          <p
            className="flex justify-between text-base font-semibold"
            key={item?._id}
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
          <span>Price ({orderedItems?.length} items)</span>
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

        {selectedAddress && (
          <>
            {' '}
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
          </>
        )}
      </div>
      <button
        className="bg-pink-600 text-white
       py-1 px-4 block w-2/4 mx-auto text-base text-center hover:bg-pink-500 mt-4 "
        onClick={orderHandler}
      >
        Place order
      </button>
    </div>
  );
}

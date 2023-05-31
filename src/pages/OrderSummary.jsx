import { selectAddress } from '../alerts/alerts';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function OrderSummary() {
  const { state } = useData();
  const { cart } = state;
  const { state: authState } = useAuth();
  const { selectedAddress } = authState;
  const price = Number(
    cart
      ?.reduce((acc, curr) => (acc += Number(curr.price) * Number(curr.qty)), 0)
      .toFixed(2)
  );
  const deliveryCharge = 5;

  const totalPrice = (price + deliveryCharge).toFixed(2);
  return (
    <main className="p-4 ">
      <h1 className="font-bold text-center text-2xl">Order Summary</h1>
      {selectedAddress && cart.length >= 1 ? (
        <>
          {' '}
          <div className="p-4 font-semibold flex flex-col gap-4">
            <h2 className="text-green-500 text-2xl text-center">
              Order Confirmed
            </h2>
            <p>Total Amount: &#36;{totalPrice}</p>
            <div>
              Order Will be delivered to:
              <p className="text-sm mt-4 text-slate-600">
                <span>{selectedAddress?.address}, </span>
                <span>{selectedAddress?.city}, </span>
                <span>{selectedAddress?.state}, </span>
                <span>{selectedAddress?.pincode}, </span>
                <span>{selectedAddress?.country}. </span>
              </p>
              <p className="text-sm">
                <span>Phone Number: {selectedAddress?.mobile}, </span>
                <span>
                  Alternate Number: {selectedAddress?.alternateMobile}
                </span>
              </p>
            </div>
          </div>
          <div>
            {cart.map((item) => (
              <div
                className="flex space-x-8 p-2 font-semibold shadow-lg"
                key={item?.id}
              >
                <div className="w-2/4 h-1/4 rounded-md overflow-hidden">
                  <img
                    src={item?.imageUrl}
                    alt={item?.title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="w-2/4 flex flex-col gap-6 ">
                  <p>{item?.title}</p>
                  <p>Total Quantity: {item?.qty}</p>
                  <p>Price: {item?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No Order found</p>
      )}
    </main>
  );
}

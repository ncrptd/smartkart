import { useAuth } from '../contexts/AuthContext';

export default function OrderSummary() {
  const { state: authState } = useAuth();
  const { selectedAddress, orderDetails } = authState;

  return (
    <section className="p-4 ">
      <h1 className="font-bold text-center text-2xl">Order Summary</h1>
      {selectedAddress && orderDetails?.items.length >= 1 ? (
        <div className=" md:flex md:shadow-lg md:p-20">
          {' '}
          <div className="p-4  flex flex-col gap-4 md:w-2/4 ">
            <h2 className="text-green-500 text-2xl text-center">
              Order Confirmed
            </h2>
            <p>
              <span className="font-bold">Payment id:</span> {orderDetails?.id}
            </p>
            <p>
              <span className="font-bold">Total Amount:</span> &#36;{' '}
              {orderDetails?.totalPrice}
            </p>
            <p className="font-bold">Order will be delivered in 2 days</p>
            <div>
              <span className="font-bold"> Order Will be delivered to:</span>
              <p className="text-sm mt-4 text-slate-600 ">
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
          <div className="md:w-2/4">
            {orderDetails.items.map((item) => (
              <div
                className="flex space-x-8 p-2 font-semibold shadow-lg md:w-3/6"
                key={item?.id}
              >
                <div className="w-2/4 h-1/4 rounded-md overflow-hidden">
                  <img
                    src={item?.imageUrl}
                    alt={item?.title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="w-2/4 flex flex-col gap-6 md:w-3/6 md:text-sm">
                  <p>{item?.title}</p>
                  <p>Total Quantity: {item?.qty}</p>
                  <p>Price: {item?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className=" text-2xl text-center mt-6 semibold">No Order found</p>
      )}
    </section>
  );
}

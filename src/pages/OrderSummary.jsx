import { useAuth } from '../contexts/AuthContext';

export default function OrderSummary() {
  const { state: authState } = useAuth();
  const { selectedAddressId, orderDetails, addressList } = authState;
  const deliveryAddress = addressList.find(
    (address) => address?.id === selectedAddressId
  );
  return (
    <section className="p-4 ">
      <h1 className="font-bold text-center text-2xl">Order Summary</h1>
      {deliveryAddress && orderDetails?.items.length >= 1 ? (
        <div className=" md:flex md:shadow-lg md:p-20">
          {' '}
          <div className="p-4  flex flex-col gap-4 md:w-2/4 ">
            <p>
              <span className="font-bold">Payment id:</span>{' '}
              <span className="font-semibold text-green-500">
                {orderDetails?.id}
              </span>
            </p>
            <p>
              <span className="font-bold ">Total Amount:</span>{' '}
              <span className="font-semibold text-green-500">
                &#8377;{orderDetails?.totalPrice}
              </span>
            </p>
            <p className="font-bold">Order will be delivered in 2 days</p>
            <div>
              <span className="font-bold"> Order Will be delivered to:</span>
              <p className="text-sm mt-4 text-slate-600 ">
                <span>{deliveryAddress?.address}, </span>
                <span>{deliveryAddress?.city}, </span>
                <span>{deliveryAddress?.state}, </span>
                <span>{deliveryAddress?.pincode}, </span>
                <span>{deliveryAddress?.country}. </span>
              </p>
              <p className="text-sm">
                <span>Phone Number: {deliveryAddress?.mobile}, </span>
                <span>
                  Alternate Number: {deliveryAddress?.alternateMobile}
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
                <div className="w-2/4 flex flex-col gap-6 md:w-3/6 md:text-sm text-slate-600">
                  <p>{item?.title}</p>
                  <p>Total Quantity: {item?.qty}</p>
                  <p>Price: &#8377;{item?.price}</p>
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

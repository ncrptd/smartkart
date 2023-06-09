import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import {
  selectAddress,
  noAddress,
  paymentError,
  orderPlaced,
} from '../alerts/alerts';
import { useNavigate } from 'react-router-dom';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import { Link } from 'react-router-dom';
export default function CheckoutDetailsCard() {
  const navigate = useNavigate();

  const { state, removeFromCart } = useData();
  const { cart } = state;

  const { state: authState } = useAuth();
  const { addressList, selectedAddressId, userDetails } = authState;

  const authDispatch = useAuthDispatch();
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
  const deliveryCharge = 50;
  const totalPrice = Number((price + deliveryCharge).toFixed(2));
  const deliveryAddress = addressList.find(
    (address) => address?.id === selectedAddressId
  );

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      paymentError('Razorpay SDK failed to load, check you connection');
      return;
    }

    const options = {
      key: 'rzp_test_LvRAnyDaMgKuD2',
      amount: (totalPrice * 100).toFixed(2),
      currency: 'INR',
      name: 'SmartKart',
      description: 'Thank you for shopping with us',
      image:
        'https://res.cloudinary.com/dwghy6c1x/image/upload/v1685879182/logo_t17dtw.jpg',
      handler: function (response) {
        authDispatch({
          type: ACTIONS_AUTH.PLACE_ORDER,
          payload: {
            items: cart,
            id: response.razorpay_payment_id,
            totalPrice: totalPrice,
          },
        });
        cart.forEach((item) => removeFromCart(item._id));
        orderPlaced();
        navigate('/orderSummary');
      },
      prefill: {
        name: userDetails?.name,
        email: userDetails?.email,
        contact: '9876543210',
      },
      theme: {
        color: '#2B51E1',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const orderHandler = () => {
    if (addressList.length < 1) {
      noAddress();
      return;
    } else if (!deliveryAddress) {
      selectAddress();
      return;
    } else {
      displayRazorpay();
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
        {cart.map((item) => (
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
          <span>Price ({cart?.length} items)</span>
          <span>&#8377;{originalPrice}</span>
        </p>
        <p className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-&#8377;{totalDiscount}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Charges</span>
          <span>&#8377;{deliveryCharge}</span>
        </p>
        <p className="flex justify-between font-bold">
          <span>Total Amount</span>
          <span>&#8377;{totalPrice}</span>
        </p>
        <hr />
        <p className="uppercase font-bold text-center my-4">Deliver to</p>
        <hr />

        {deliveryAddress && (
          <>
            {' '}
            <div className="text-sm">
              <p className="font-semibold">{deliveryAddress?.name}</p>
              <span>{deliveryAddress?.address}, </span>
              <span>{deliveryAddress?.city}, </span>
              <span>{deliveryAddress?.state}, </span>
              <span>{deliveryAddress?.pincode}, </span>
              <span>{deliveryAddress?.country}. </span>
            </div>
            <p className="text-sm">
              <span>Phone Number: {deliveryAddress?.mobile}, </span>
              <span>Alternate Number: {deliveryAddress?.alternateMobile}</span>
            </p>
          </>
        )}
      </div>
      <Link
        to={addressList.length < 1 && '/profileDetails'}
        state={{ from: true }}
        className="bg-pink-600 text-white
       py-1 px-4 block w-2/4 mx-auto text-base text-center hover:bg-pink-500 mt-4 "
        onClick={orderHandler}
      >
        Place order
      </Link>
    </div>
  );
}

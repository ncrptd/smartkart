import React from 'react';
import CartCard from '../components/CartCard';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const { state } = useData();
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
  );
  const totalDiscount = (originalPrice - price).toFixed(2);
  const deliveryCharge = 50;
  const totalPrice = (price + deliveryCharge).toFixed(2);
  return (
    <main className="p-6 ">
      {cart?.length < 1 ? (
        <h1 className="text-center font-bold uppercase">Cart is Empty</h1>
      ) : (
        <div
          className="container mx-auto md:flex gap-4  md:px-32 items-start
      "
        >
          <div className="w-full">
            {cart?.map((product) => (
              <CartCard key={product._id} product={product} />
            ))}
          </div>
          {/* price details  */}

          <div
            className="rounded-xl shadow-lg mt-6 px-4 py-12  md:p-4 md:mt-0 md:flex md:flex-col md:justify-between md:text-2xl lg:w-full  
          text-slate-600 

       "
          >
            <p className=" font-bold  py-2"> Price Details</p>
            <hr />
            <div className="flex flex-col gap-4 mt-2 justify-between text-base font-semibold">
              <p className="flex justify-between">
                Price ({cart?.length} item) <span>&#8377;{price}</span>
              </p>
              <p className="flex justify-between text-green-500">
                Discount <span>&#8377;{totalDiscount}</span>
              </p>
              <p className="flex justify-between">
                Delivery Charges: <span>&#8377;{deliveryCharge}</span>
              </p>
              <p className="flex justify-between font-bold">
                TOTAL AMOUNT <span>&#8377;{totalPrice}</span>
              </p>
              <button
                className=" text-sm bg-pink-600
            py-2.5 px-12 mx-auto text-white font-bold 
            "
                onClick={() => {
                  navigate('/checkout');
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

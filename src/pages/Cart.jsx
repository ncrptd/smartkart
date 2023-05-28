import React from 'react';
import CartCard from '../components/CartCard';
import { useData } from '../contexts/DataContext';

export default function Cart() {
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
  const deliveryCharge = 5;
  const totalPrice = (price + deliveryCharge).toFixed(2);
  return (
    <main className="p-6">
      {cart?.length < 1 ? (
        <p className="text-center font-bold uppercase">Cart is Empty</p>
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
            className="rounded-xl shadow-lg mt-6 px-4 py-12  md:p-4 md:mt-0 md:flex md:flex-col md:justify-between md:text-2xl md:w-3/4 
          text-slate-600 

       "
          >
            <p className=" font-bold  py-2"> Price Details</p>
            <hr />
            <div className="flex flex-col gap-4 mt-2 justify-between text-base font-semibold">
              <p className="flex justify-between">
                Price ({cart?.length} item) <span>&#36;{price}</span>
              </p>
              <p className="flex justify-between">
                Discount <span>&#36;{totalDiscount}</span>
              </p>
              <p className="flex justify-between">
                Delivery Charges: <span>&#36;{deliveryCharge}</span>
              </p>
              <p className="flex justify-between">
                TOTAL AMOUNT <span>&#36;{totalPrice}</span>
              </p>
              <button
                className=" text-sm bg-pink-600
            w-full py-2.5 px-2 text-white font-bold 
            "
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

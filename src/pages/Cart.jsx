import React from 'react';
import CartCard from '../components/CartCard';
import { useData } from '../contexts/DataContext';

export default function Cart() {
  const { cart } = useData();

  return (
    <main className="p-4">
      {cart.length < 1 ? (
        <p className="text-center font-bold uppercase">Cart is Empty</p>
      ) : (
        <div
          className="container mx-auto md:flex gap-4  md:px-32 items-start
      "
        >
          <div>
            {cart.map((product) => (
              <CartCard
                imageUrl={`https://res.cloudinary.com/dwghy6c1x/image/upload/v1684297577/Women_s_Skinny_Jeans_mkzb7a.webp`}
                title={product?.title}
                price={product?.price}
                quantity={product?.qty}
              />
            ))}
          </div>
          <div
            className="rounded-xl shadow-lg mt-6 px-4 py-12 text-lg md:w-3/4 md:p-4 md:mt-0 md:flex md:flex-col md:justify-between md:text-2xl  
          text-slate-600

       "
          >
            <p className="font-bold text py-2"> Price Details</p>
            <hr />
            <div className="flex flex-col gap-4 mt-2">
              <p className="">
                Price {} item <span>{}</span>
              </p>
              <p>Discount </p>

              <p className="font-bold">TOTAL AMOUNT {}</p>
              <button
                className=" text-sm bg-pink-600
            w-full py-1.5 px-2 text-white font-bold 
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

import { useState } from 'react';
import Profile from '../components/Profile';
import Address from '../components/Address';
export default function ProfileDetails() {
  const [show, setShow] = useState(0);
  const styles = `bg-pink-500  text-white
px-2 py-1 rounded-lg `;

  return (
    <div className="container mx-auto flex flex-col items-center mt-10 p-4 md:w-3/6 ">
      <h1 className="text-center font-4xl font-bold">Account</h1>
      <div className="flex  justify-between w-full shadow-lg px-4 py-2 font-semibold">
        <button
          className={show === 0 ? styles : 'bg-slate-100 px-2 py-1 rounded-lg'}
          onClick={() => setShow(0)}
        >
          Profile
        </button>
        <button
          className={show === 1 ? styles : 'bg-slate-100 px-2 py-1 rounded-lg'}
          onClick={() => setShow(1)}
        >
          Address
        </button>
      </div>
      {show === 0 && <Profile />}
      {show === 1 && <Address />}
    </div>
  );
}

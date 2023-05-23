import React from 'react';
import { BarLoader } from 'react-spinners';
export default function Loader() {
  return (
    <div className="h-screen  flex justify-center items-center">
      <BarLoader color="#ec4899" />
    </div>
  );
}

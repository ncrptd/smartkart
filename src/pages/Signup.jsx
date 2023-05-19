import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Signup() {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });
  const handleFormDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormDetails((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  return (
    <main className="h-screen flex justify-center items-center bg-slate-100 p-6">
      <form className="container mx-auto flex flex-col justify-center item-center gap-4 bg-white p-8  md:w-2/5 rounded-2xl shadow-2xl text-base">
        <label htmlFor="email ">Name </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formDetails.name}
          placeholder="john doe"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <label htmlFor="email ">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formDetails.email}
          placeholder="johndoe@email.com"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formDetails.password}
          placeholder="*******"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formDetails.confirmPassword}
          placeholder="*******"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <button
          className="bg-pink-600 text-white
         py-1 px-4 w-full  "
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Create New Account
        </button>
        <p>
          Already have an account ?{' '}
          <Link className="text-pink-600 hover:text-slate-500" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}

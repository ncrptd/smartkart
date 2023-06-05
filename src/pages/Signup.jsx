import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import { signedUp } from '../alerts/alerts';
export default function Signup() {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [show, setShow] = useState({ pass: false, cnfPass: false });

  const handleFormDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormDetails((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  function validatePassword(password) {
    const pattern = /^(?=.*\d).{8,}$/;
    return pattern.test(password);
  }

  const validateFormDetails = () => {
    const { firstName, lastName, email, password } = formDetails;
    if (firstName === '') {
      setErrorMsg('First Name cannot be empty');
      return false;
    } else if (lastName === '') {
      setErrorMsg('Last Name cannot be empty');
      return false;
    } else if (formDetails.password !== formDetails.confirmPassword) {
      setErrorMsg('Password and Confirm Password does not match');
      return false;
    } else if (!validateEmail(email)) {
      setErrorMsg('Please provide valid email');
    } else if (!validatePassword(password)) {
      setErrorMsg(
        `Password must be at least 8 characters and contain at least 1 digit.`
      );
      return false;
    } else {
      setErrorMsg('');
      return true;
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormDetails()) {
      return;
    }
    try {
      const body = formDetails;
      const res = await axios.post('/api/auth/signup', body);
      const { createdUser, encodedToken } = res.data;
      const {
        cart,
        email,
        firstName,
        lastName,
        createdAt,
        updatedAt,
        wishlist,
        _id,
      } = createdUser;
      const user = {
        cart,
        email,
        firstName,
        lastName,
        createdAt,
        updatedAt,
        wishlist,
        _id,
      };
      localStorage.setItem(
        'user',
        JSON.stringify({
          userDetails: user,
          encodedToken: encodedToken,
        })
      );

      dispatch({
        type: ACTIONS_AUTH.LOGIN_SUCCESS,
        payload: { userDetails: user },
      });
      navigate('/');
      signedUp();
    } catch (error) {
      console.log(error);
      const { status, data } = error.response;
      if (status === 422) {
        setErrorMsg('Email already exists');
      }
      console.log(status, data);
    }
  };
  return (
    <main className=" flex justify-center items-center bg-slate-100 p-6">
      <form
        className="container mx-auto flex flex-col justify-center item-center bg-white px-8 py-2  md:w-2/5 rounded-2xl shadow-2xl text-base gap-2"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="firstName ">FirstName</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formDetails.firstName}
          placeholder="John"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <label htmlFor="lastName ">LastName</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formDetails.lastName}
          placeholder="Doe"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <label htmlFor="email ">Email address</label>
        <input
          id="email"
          name="email"
          value={formDetails.email}
          placeholder="johndoe@email.com"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <label htmlFor="password">Password</label>
        <div className="flex justify-between items-center">
          <input
            type={show.pass ? 'text' : 'password'}
            id="password"
            name="password"
            value={formDetails.password}
            placeholder="*******"
            onChange={handleFormDetails}
            className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400 w-full"
          />
          <div
            className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
            onClick={() => {
              setShow((prev) => {
                return { ...prev, pass: !prev.pass };
              });
            }}
          >
            {show.pass ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
        </div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="flex justify-between items-center">
          <input
            type={show.cnfPass ? 'text' : 'password'}
            id="password"
            name="confirmPassword"
            value={formDetails.confirmPassword}
            placeholder="*******"
            onChange={handleFormDetails}
            className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400 w-full"
          />
          <div
            className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
            onClick={() => {
              setShow((prev) => {
                return { ...prev, cnfPass: !prev.cnfPass };
              });
            }}
          >
            {show.cnfPass ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
        </div>
        <p className="text-red-500 font-bold capitalize">{errorMsg}</p>
        <button
          className="bg-pink-600 text-white
         py-1 px-4 w-full "
          type="submit"
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

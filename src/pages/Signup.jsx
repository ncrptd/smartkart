import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
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
        <input
          type="password"
          id="password"
          name="password"
          value={formDetails.password}
          placeholder="*******"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formDetails.confirmPassword}
          placeholder="*******"
          onChange={handleFormDetails}
          className="border-2 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
        />
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

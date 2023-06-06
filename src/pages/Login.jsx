import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import { ACTIONS } from '../reducer/dataReducer';
import { loggedIn } from '../alerts/alerts';
import { useDataDispatch } from '../contexts/DataContext';
const GUEST = {
  email: 'johndoe@gmail.com',
  password: 'johndoe5',
};

export default function Login() {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [show, setShow] = useState(false);
  const dataDispatch = useDataDispatch();
  const authDispatch = useAuthDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleFormDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormDetails((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  async function handleLogin({ email, password }) {
    if (isLoggedIn) return;
    if (email !== '' && password !== '') {
      try {
        const res = await axios.post('/api/auth/login', {
          email: email,
          password: password,
        });
        const { foundUser, encodedToken } = res.data;
        authDispatch({
          type: ACTIONS_AUTH.LOGIN_SUCCESS,
          payload: { userDetails: foundUser },
        });
        dataDispatch({
          type: ACTIONS.ADD_TO_CART,
          payload: { cart: foundUser.cart },
        });
        dataDispatch({
          type: ACTIONS.ADD_TO_WISHLIST,
          payload: { wishlist: foundUser.wishlist },
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            userDetails: foundUser,
            encodedToken: encodedToken,
          })
        );
        if (location?.state?.from?.pathname === undefined) {
          navigate('/');
        } else {
          navigate(location?.state?.from?.pathname);
        }
        loggedIn();
      } catch (error) {
        console.log(error.message);
        setErrorMsg('No user found');
        authDispatch({ type: ACTIONS_AUTH.LOGIN_FAILURE, payload: error });
      }
    }
  }
  function handleGuestLogin(guest) {
    const { email, password } = guest;

    setFormDetails((prev) => {
      return { ...prev, email, password };
    });
    handleLogin(guest);
  }
  return (
    <main className="h-screen flex justify-center items-center bg-slate-100 p-6">
      <form
        className="container mx-auto flex flex-col justify-center item-center gap-4 bg-white p-12  md:w-2/5 rounded-2xl shadow-2xl text-base"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(formDetails);
        }}
      >
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
        <div className="flex justify-between items-center">
          <input
            type={show ? 'text' : 'password'}
            id="password"
            name="password"
            value={formDetails.password}
            placeholder="*******"
            onChange={handleFormDetails}
            className="border-2 border-r-0 border-slate -400 rounded-sm p-2 focus:outline-gray-400 w-full"
          />
          <div
            className="border-2 border-l-0 border-slate -400 rounded-sm p-2 focus:outline-gray-400"
            onClick={() => {
              setShow((prev) => {
                return !prev;
              });
            }}
          >
            {show ? (
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
        <button
          className="bg-pink-600 text-white
           py-1 px-4 w-full  "
          type="submit"
        >
          Login
        </button>
        <button
          className="bg-pink-600 text-white
           py-1 px-4 w-full  shadow-2xl"
          onClick={(e) => {
            e.preventDefault();
            handleGuestLogin(GUEST);
          }}
        >
          Login as Guest
        </button>
        <p>
          Don't have an account ?{' '}
          <Link to="/signup" className="text-pink-600 hover:text-slate-500">
            Sign up
          </Link>
        </p>
        <p className="font-bold uppercase text-red-500 text-center 2xl ">
          {errorMsg}
        </p>
      </form>
    </main>
  );
}

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
import { ACTIONS } from '../reducer/dataReducer';
const GUEST = {
  email: 'johndoe@gmail.com',
  password: 'johndoe',
};

export default function Login() {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAuthDispatch();
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
        console.log(foundUser);
        dispatch({
          type: ACTIONS_AUTH.LOGIN_SUCCESS,
          payload: { userDetails: foundUser },
        });
        dispatch({
          type: ACTIONS.ADD_TO_CART,
          payload: { cart: foundUser.cart },
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
      } catch (error) {
        console.log(error.message);
        dispatch({ type: ACTIONS_AUTH.LOGIN_FAILURE, payload: error });
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
      <form className="container mx-auto flex flex-col justify-center item-center gap-4 bg-white p-12  md:w-2/5 rounded-2xl shadow-2xl text-base">
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
        <button
          className="bg-pink-600 text-white
           py-1 px-4 w-full  "
          onClick={(e) => {
            e.preventDefault();
            handleLogin(formDetails);
          }}
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
      </form>
    </main>
  );
}

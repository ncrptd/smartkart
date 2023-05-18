import axios from 'axios';
import React, { useState } from 'react';
import { useAuthDispatch } from '../contexts/AuthContext';
import { ACTIONS_AUTH } from '../reducer/authReducer';
const GUEST = {
  email: 'johndoe@gmail.com',
  password: 'johndoe',
};
function Login() {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAuthDispatch();

  const handleFormDetails = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormDetails((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  async function handleLogin({ email, password }) {
    if (email !== '' && password !== '') {
      try {
        const res = await axios.post('/api/auth/login', {
          email: email,
          password: password,
        });
        const { foundUser, encodedToken } = res.data;

        dispatch({
          type: ACTIONS_AUTH.LOGIN_SUCCESS,
          payload: { user: foundUser, encodedToken },
        });
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
    console.log(guest);
    handleLogin(guest);
  }
  return (
    <main className="h-screen flex justify-center items-center bg-slate-100 p-6">
      <form
        className="container mx-auto flex flex-col justify-center item-center space-y-4 bg-white py-10 px-4  md:w-2/6 rounded-lg shadow-2xl text-base


  "
      >
        <label htmlFor="email">Email address</label>
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
      </form>
    </main>
  );
}

export default Login;

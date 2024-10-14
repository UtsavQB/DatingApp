import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Login Data:', data);
  };

  console.log('check')

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-opacity-70 bg-white/50 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-4">Find your match and start your love story.</p>

        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24" htmlFor="email">
            Email:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiMail className='mt-1' />
              </span>
              <input
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Please enter a valid email address.',
                  },
                })}
                className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.email ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-200'
                }`}
                placeholder="example@mail.com"
                id="email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24" htmlFor="password">
            Password:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiLock className='mt-1'/>
              </span>
              <input
                {...register('password', { required: 'Password is required.' })}
                className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.password ? 'border-red-500 focus:ring-red-300' : 'focus:ring-pink-200'
                }`}
                placeholder="********"
                type="password"
                id="password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/" className="text-pink-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

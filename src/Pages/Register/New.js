import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import couplesvg from "../../Assets/Icon/couple.svg";
const New = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <>
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {/* Email Icon */}
            <img src={couplesvg} alt="hello" />
          </span>
        </div>
        {/* Main Container */}
        <div className="bg-white md:w-1/2 shadow-lg rounded-lg w-full max-w-md p-8 ms-2">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-700">Welcome</h1>
            <p className="text-sm text-gray-500">
              Please enter your login details below
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* Email Icon */}
                  <FiMail className="mt-1" />
                </span>
                <input
                  type="email"
                  placeholder="thisuix@mail.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`block w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-pink-500 focus:border-pink-500`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* Password Icon */}
                  <FiLock className="mt-1" />
                </span>
                <input
                  type="password"
                  placeholder="**********"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`block w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-pink-500 focus:border-pink-500`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right mb-6">
              <a href="/" className="text-sm text-pink-500 hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg"
            >
              LOGIN
            </button>
          </form>

          {/* Social Media Login */}
          <div className="mt-8">
            <div className="text-center text-gray-500 text-sm mb-4">OR</div>
            <div className="flex justify-between">
              <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg mx-1">
                <i className="fab fa-google mr-2"></i> Google
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg mx-1">
                <i className="fab fa-facebook mr-2"></i> Facebook
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg mx-1">
                <i className="fab fa-apple mr-2"></i> Apple
              </button>
            </div>
          </div>

          {/* Register Section */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link to="/" className="text-pink-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;

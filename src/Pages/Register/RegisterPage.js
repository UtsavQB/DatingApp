import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetchData(data);
};

const fetchData = async (formData) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/api/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result, "Response Data");
console.log(formData.email,"formData.email");

        navigate("/Otp",{state:{email:formData.email}})

    } catch (error) {
        console.error("Error:", error);
    }
};
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 bg-opacity-70 bg-white/50 rounded-lg shadow-lg w-96 z-10 hover:scale-105 transition-transform transform"
      >
        <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h2>

        {/* <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24 mr-2" htmlFor="firstName">
            First Name:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiUser className="mt-1" />
              </span>
              <input
                {...register("userFirstName", {
                  required: "First name is required.",
                })}
                id="userFirstName"
                className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-pink-200"
                }`}
                placeholder="First Name"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
        </div> */}

        {/* <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24 mr-2" htmlFor="lastName">
            Last Name:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiUser className="mt-1" />
              </span>
              <input
                {...register("userLastName", {
                  required: "Last name is required.",
                })}
                id="userLastName"
                className={`border-0 flex-1 py-3 w-full px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-pink-200"
                }`}
                placeholder="Last Name"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div> */}

        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24 mr-2" htmlFor="username">
            Username:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiUser className="mt-1" />
              </span>
              <input
                {...register("username", { required: "Username is required." })}
                id="username"
                className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.username
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-pink-200"
                }`}
                placeholder="Username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24 mr-2" htmlFor="email">
            Email:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiMail className="mt-1" />
              </span>
              <input
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                id="email"
                className={`border-0 flex-1 py-3 w-full px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-pink-200"
                }`}
                placeholder="example@mail.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24 mr-2" htmlFor="password">
            Password:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiLock className="mt-1" />
              </span>
              <input
                {...register("password", { required: "Password is required." })}
                id="password"
                className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-pink-200"
                }`}
                placeholder="********"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
    <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24 mr-2" htmlFor="confirmPassword">
           Confirm Password:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiLock className="mt-1" />
              </span>
              <input
                {...register("confirmPassword", { required: "confirm Password is required." })}
                id="confirmPassword"
                className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-pink-200"
                }`}
                placeholder="********"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* <div className="mb-6 flex items-center">
          <label className="block text-gray-700 w-24 mr-2" htmlFor="phoneNumber">
          phone Number:
          </label>
          <div className="flex-1">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="p-3 bg-pink-500 text-white rounded-md h-12">
                <FiLock className="mt-1" />
              </span>
              <input
                {...register("phoneNumber", { required: "phone Number is required." })}
                id="phoneNumber"
                className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-pink-200"
                }`}
                placeholder="phone Number"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div> */}


        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Register
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/Login" className="text-pink-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

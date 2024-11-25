import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useUpdateSingle } from '../../hooks/Api';
// import { Snackbar } from '@mui/material';
import couplesvg from "../../Assets/Icon/couple.svg";
import Landsvg from "../../Assets/Icon/Land.svg";
import Buildings from "../../Assets/Icon/Buidings.svg";
import Flower from "../../Assets/Icon/Flower.svg";
import Flower2 from "../../Assets/Icon/Flower2.svg";
import Flower3 from "../../Assets/Icon/Flower3.svg";
import Frame from "../../Assets/Icon/Frame.svg";


const RegisterPage = () => {
  // const [data, setData] = useState();
    const [message, setMessage] = useState('')
    console.log("message",message);

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
      console.log(formData,'formData')
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result, "Response Data");
        setMessage(result.message)
        
      console.log(formData.email, "formData.email");
        localStorage.setItem("Email", formData.email )
        localStorage.setItem("id", result._id )
      // console.log(result.id, "formData.id");
        setState({ open: true })
        setTimeout(()=>{
          navigate("/Otp")
        },2000)  
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // snakbar
  // const { mutate, isSuccess, isError, error, data: Updated_response, isLoading } = useForm()
  const [state, setState] = useState({
      open: false
  });
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r bg-pink-100">
      <div className="hidden md:flex md:w-1/2 items-center justify-center w-full">

        <span className="absolute left-0 bottom-0 z-10 flex items-center pl-0">
          <img src={Landsvg} alt="land" className="h-auto w-full" />
        </span>
        <span className="absolute left-0 bottom-7 z-0 flex items-center sm:bottom-6 md:bottom-5 lg:bottom-4 xl:bottom-3">
          <img src={Buildings} alt="buildings" className="h-auto w-full" />
        </span>
        <span className="absolute left-0 top-0 flex items-center">
          <img src={Flower} alt="flower" className="h-auto w-full" />
        </span>
        <span className="absolute right-0 top-0 flex items-center">
          <img src={Flower2} alt="flower2" className="h-auto w-full" />
        </span>
        <span className="absolute right-0 bottom-0 flex items-center">
          <img src={Flower3} alt="flower3" className="h-auto w-full" />
        </span>
        <span className="absolute top-20  flex item-center">
            <img src={Frame} alt="Frame" className="animate-bounce"/>
        </span>
        <span className="absolute left-4 md:left-12 lg:left-48 bottom-4 md:bottom-6 lg:bottom-10 z-20 flex items-center pl-2 sm:left-4 xl:left-48 sm:bottom-4 xl:bottom-10 sm:pl-3">
          <img
            src={couplesvg}
            alt="couple"
            className="h-auto md:h-96 lg:h-96 xl:h-[450px] 2xl:h-[600px] w-full"
          />
        </span>
      </div>

      <div className="z-20 items-center justify-center md:flex md:w-1/2">
          
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white md:w-1/3 shadow-lg rounded-lg w-full max-w-md sm:w-1/4 lg:w-1/2 p-4 md:p-8 z-20"
        >
          <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">
            Register
          </h2>

    

          <div className="mb-6 flex items-center">
            <label className="block text-gray-700 w-24 mr-2" htmlFor="username">
              Username:
            </label>
            <div className="flex-1">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="p-3 text-black rounded-md h-12">
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
                <span className="p-3 text-black rounded-md h-12">
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
                <span className="p-3 text-black rounded-md h-12">
                  <FiLock className="mt-1" />
                </span>
                <input
                  type="password"
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
              <span className="p-3 text-black rounded-md h-12">
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
        </div> */}
          <div className="mb-6 flex items-center">
            <label
              className="block text-gray-700 w-24 mr-2"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <div className="flex-1">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <svg
                  className="p-3 text-black rounded-md h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>

                <input
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                  type="confirmPassword"
                  id="confirmPassword"
                  className={`border-0 flex-1 w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-300"
                      : "focus:ring-pink-200"
                  }`}
                  placeholder="Confirm password"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors?.confirmpassword?.message}
              </p>
            </div>
          </div>

          

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
    </div>
  );
};

export default RegisterPage;

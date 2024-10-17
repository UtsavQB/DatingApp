import {React, useState} from "react";
import { useForm } from "react-hook-form";
  
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import couplesvg from "../../Assets/Icon/couple.svg";
import Landsvg from "../../Assets/Icon/Land.svg";
import Buildings from "../../Assets/Icon/Buidings.svg";
import Flower from "../../Assets/Icon/Flower.svg";
import Flower2 from "../../Assets/Icon/Flower2.svg";
import Flower3 from "../../Assets/Icon/Flower3.svg";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

const New = () => {
  const [message, setMessage] = useState("");
  console.log("message", message);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data, "data");
    console.log("Login Data:", data);
    await fetchData({ loginInput: data.email, password: data.password });
  };

  const fetchData = async (data) => {
    console.log(data, "data fetch data");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, "Response Data");
      setMessage(result.message);
      console.log(data.email, "formData.email");
      setState({ open: true });
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const {
    mutate,
    isSuccess,
    isError,
    error,
    data: Updated_response,
    isLoading,
  } = useForm();
  const [state, setState] = useState({
    open: false,
  });
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-pink-100 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="hidden md:flex md:w-1/2 items-center justify-center w-full">
          {/* Background Images */}
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
          <span className="absolute left-4 md:left-12 lg:left-48 bottom-4 md:bottom-6 lg:bottom-10 z-20 flex items-center pl-2 sm:left-4 xl:left-48 sm:bottom-4 xl:bottom-10 sm:pl-3">
            <img
              src={couplesvg}
              alt="couple"
              className="h-auto md:h-96 lg:h-96 xl:h-[450px] 2xl:h-[600px] w-full"
            />
          </span>
        </div>

        {/* Main Container */}
        <div className="bg-white md:w-1/2 shadow-lg rounded-lg w-full max-w-md sm:w-full lg:w-1/3 p-4 md:p-8 z-20">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-700">Welcome</h1>
            <p className="text-sm text-gray-500">
              Please enter your login details below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-6 flex items-center">
              <label className="block text-gray-700 w-24 mr-2" htmlFor="email">
                Email / Username:
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
                    placeholder="example@mail.com or Username"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6 flex items-center">
              <label
                className="block text-gray-700 w-24 mr-2"
                htmlFor="password"
              >
                Password:
              </label>
              <div className="flex-1">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <span className="p-3 text-black rounded-md h-12">
                    <FiLock className="mt-1" />
                  </span>
                  <input
                    {...register("password", {
                      required: "Password is required.",
                    })}
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

            <div className="text-right mb-6">
              <Link to="/" className="text-sm text-pink-500 hover:underline">
                Forgot your password?
              </Link>
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
              <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg mx-1 flex items-center justify-center">
                <FaGoogle className="mr-2" /> Google
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg mx-1 flex items-center justify-center">
                <FaFacebook className="mr-2" /> Facebook
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg mx-1 flex items-center justify-center">
                <FaApple className="mr-2" /> Apple
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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={error?.response?.data?.message || message}
        key={state?.Transition?.name}
        autoHideDuration={3000}
      />
    </>
  );
};

export default New;

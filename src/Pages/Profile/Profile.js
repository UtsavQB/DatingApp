import React from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiCalendar } from "react-icons/fi";
// import profileIcon from "../../Assets/Icon/ProfileIcon.svg"; // Custom profile icon, you can change it as per your need

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle profile submission logic here
  };

  return (
    <>
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        {/* <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <span className="absolute left-48 bottom-10 z-20 flex items-center pl-3">
            <img src={profileIcon} alt="Profile Icon" />
          </span>
          <span className="absolute left-0 bottom-0 z-10 flex items-center pl-3">
            <img src={profileIcon} alt="Profile Icon" />
          </span>
        </div> */}

        {/* Profile Form Container */}
        <div className="bg-white md:w-1/2 shadow-lg rounded-lg w-full max-w-md p-8 ms-2">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-700">Profile Details</h1>
            <p className="text-sm text-gray-500">Please update your information below</p>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiUser className="mt-1" />
                </span>
                <input
                  type="text"
                  placeholder="John"
                  {...register("firstName", {
                    required: "First name is required",
                    maxLength: {
                      value: 50,
                      message: "First name must be less than 50 characters",
                    },
                  })}
                  className={`block w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:ring-pink-500 focus:border-pink-500`}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiUser className="mt-1" />
                </span>
                <input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName", {
                    required: "Last name is required",
                    maxLength: {
                      value: 50,
                      message: "Last name must be less than 50 characters",
                    },
                  })}
                  className={`block w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:ring-pink-500 focus:border-pink-500`}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Birth Date */}
            <div className="mb-6">
              <label className="block text-gray-700">Birth Date</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiCalendar className="mt-1" />
                </span>
                <input
                  type="date"
                  {...register("birthDate", {
                    required: "Birth date is required",
                  })}
                  className={`block w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.birthDate ? "border-red-500" : "border-gray-300"
                  } focus:ring-pink-500 focus:border-pink-500`}
                />
              </div>
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg"
            >
              Confirm
            </button>
          </form>

          {/* Cancel Section */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              <a href="/" className="text-pink-600 hover:underline">
                Cancel
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

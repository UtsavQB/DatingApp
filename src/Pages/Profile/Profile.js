import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FaCamera, FaEdit } from "react-icons/fa";
import Select from "react-select";
import Flower from "../../Assets/Icon/Flower.svg";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const hobbiesOptions = [
  { value: "reading", label: "Reading" },
  { value: "traveling", label: "Traveling" },
  { value: "gaming", label: "Gaming" },
  // Add more hobbies as needed
];

const ProfilePage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    // Handle profile update logic here
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 relative">
      <div className="hidden md:flex md:w-1/2 items-center justify-center w-full">
        <span className="absolute left-0 top-0 flex items-center">
          <img src={Flower} alt="flower" className="h-auto w-full" />
        </span>
      </div>

      {/* <div className="bg-white md:w-1/2 shadow-lg rounded-lg w-full max-w-md sm:w-full lg:w-1/3 p-4 md:p-8 z-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-700">Profile</h1>
          <p className="text-md text-gray-500">
            Please update your details below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mb-4 relative">
            <label htmlFor="profile-photo" className="cursor-pointer">
              <div className="relative w-24 h-24">
                <img
                  src={profilePhoto || "https://via.placeholder.com/1"}
                  className="w-full h-full rounded-full border-2 border-pink-200 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaCamera className="text-gray-500 text-2xl h-10 w-10" />
                </div>
                <FaEdit className="absolute bottom-2 right-0 text-blue-500 w-5 h-5" />
              </div>
            </label>
            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label
              className="block text-gray-700 mr-3 w-24"
              htmlFor="firstname"
            >
              First Name:
            </label>
            <input
              {...register("firstname", {
                required: "First Name is required.",
              })}
              id="firstname"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.firstname
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="First Name"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24" htmlFor="lastname">
              Last Name:
            </label>
            <input
              {...register("lastname", { required: "Last Name is required." })}
              id="lastname"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.lastname
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="Last Name"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24" htmlFor="age">
              Age:
            </label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required.",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old.",
                },
              })}
              id="age"
              min="18" // Set minimum age to 18
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.age
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="Age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">Gender:</label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("gender", option)}
              className={`w-full ${errors.gender ? "border-red-500" : ""}`}
              placeholder="Select Gender"
            />
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">Interested Gender:</label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("interestedGender", option)}
              className={`w-full ${errors.interestedGender ? "border-red-500" : ""}`}
              placeholder="Select Interested Gender"
            />
            {errors.interestedGender && (
              <p className="text-red-500 text-sm mt-1">{errors.interestedGender.message}</p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">
              Date of Birth:
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required.",
              })}
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.dateOfBirth
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">Hobbies:</label>
            <Select
              options={hobbiesOptions}
              isMulti
              onChange={(options) => setValue("hobbies", options)}
              className={`w-full ${errors.hobbies ? "border-red-500" : ""}`}
              placeholder="Select or create hobbies"
            />
            {errors.hobbies && (
              <p className="text-red-500 text-sm mt-1">{errors.hobbies.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            Save Changes
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Want to go back?{" "}
            <Link to="/" className="text-pink-600 hover:underline">
              Cancel
            </Link>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default ProfilePage;

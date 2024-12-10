import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FaCamera, FaEdit } from "react-icons/fa";
import { Steps, Button, message } from "antd";
import image from "../../Image/01.png";
import Select from "react-select";


const { Step } = Steps;

const Stepper = () => {
  const navigate = useNavigate();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [current, setCurrent] = useState(0);
  console.log(current,"current")
  const { register, handleSubmit, formState: { errors }, setValue} = useForm();

  // Handle photo upload
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

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  // const next = () => {
  //   // if (current < steps.length - 1) {
  //     setCurrent(current + 1);
  //   }

  const onHandleClick=(params)=>{
    if(params){
      setCurrent(current + 1);
    }else{
      setCurrent(current - 1);
    }
  }

  const onSubmit = (data) => {
    console.log(data, "form data");
    // message.success('Profile created successfully!');
    navigate("/dashboard");
  };


  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  
  const hobbiesOptions = [
    { value: "reading", label: "Reading" },
    { value: "traveling", label: "Traveling" },
    { value: "gaming", label: "Gaming" },
  ];


  
  // Steps content (fields)
  const steps = [
    
    {
      title: "step 1",
      content: (
        <>
        <div className="flex justify-center mb-4 relative">
              <label htmlFor="profile-photo" className="cursor-pointer">
                <div className="relative w-24 h-24">
                  <img
                    src={profilePhoto || "https://via.placeholder.com/1"}
                    className="w-full h-full rounded-full border-2 border-pink-200 object-cover"
                  />
                  {profilePhoto === null && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaCamera className="text-gray-500 text-2xl h-10 w-10" />
                    </div>
                  )}
                  <FaEdit className="absolute bottom-2 right-0 text-gray-500 w-5 h-5" />
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
          <div className="mb-1 items-start">
            <label className="text-gray-700 mr-3 w-32 flex" htmlFor="firstname">
              First Name:
            </label>
            <input
              {...register("firstname", {
                required: "First Name is required.",
              })}
              id="firstname"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${errors.firstname ? "border-red-500 focus:ring-red-300" : "focus:ring-pink-200"}`}
              placeholder="First Name"
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
          </div>
          <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex" htmlFor="lastname">
              Last Name:
            </label>
            <input
              {...register("lastname", { required: "Last Name is required." })}
              id="lastname"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${errors.lastname ? "border-red-500 focus:ring-red-300" : "focus:ring-pink-200"}`}
              placeholder="Last Name"
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
          </div>
          <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex" htmlFor="dob">
              Date of Birth:
            </label>
            <input
              {...register("dob", { required: "Date of Birth is required." })}
              id="dob"
              type="date"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${errors.dob ? "border-red-500 focus:ring-red-300" : "focus:ring-pink-200"}`}
              placeholder="Date of Birth"
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>
          <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex">Age:</label>
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
              min="18"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${errors.age ? "border-red-500 focus:ring-red-300" : "focus:ring-pink-200"}`}
              placeholder="Age"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
          </div>
        </>
      ),
    },
    {
      title: "step 2",
      content: (
        <>

        <form>
          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-24 flex">Gender:</label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("gender", option?.value)}
              className={`w-full backdrop-blur-md bg-white/40 bg-opacity-10 z-20${errors.gender ? " border-red-500" : ""}`}
              placeholder="Select Gender"
            />
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-full flex">Interested Gender:</label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("interestedGender", option?.value)}
              className={`w-full backdrop-blur-md bg-white/40 bg-opacity-10 z-10${errors.interestedGender ? " border-red-500" : ""}`}
              placeholder="Select Interested Gender"
            />
            {errors.interestedGender && <p className="text-red-500 text-sm mt-1">{errors.interestedGender.message}</p>}
          </div>

          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-24 flex">Hobbies:</label>
            <Select
              options={hobbiesOptions}
              isMulti
              onChange={(options) => setValue("hobbies", options?.value)}
              className={`w-full ${errors.hobbies ? "border-red-500" : ""}`}
              placeholder="Select or create hobbies"
            />
            {errors.hobbies && <p className="text-red-500 text-sm mt-1">{errors.hobbies.message}</p>}
          </div> 
        </form>
        </>
      ),
    },
    
  ];


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="hidden md:flex md:w-3/5 w-3/5 items-center justify-center h-3/5">
        <div className="container h-screen">
          <div className="p-4">
            <img src={image} className="w-4/6 h-4/6 object-cover rounded-lg mt-14 animate-slow-bounce" />
          </div>
        </div>
      </div>

      <div className="bg-white md:w-1/2 shadow-lg rounded-lg w-full max-w-md sm:w-full lg:w-1/3 p-4 md:p-8 z-20 backdrop-blur-md bg-white/40 bg-opacity-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-700">Profile</h1>
          <p className="text-md text-gray-900 underline underline-offset-1">
            Please update your details below
          </p>
        </div>

        <form>
          <div className="steps-content">
            {steps[current]?.content}
          </div>

          <div className="flex justify-between mt-4">
            <Button
              style={{ display: current === 0 ? 'none' : 'inline-block' }}
              onClick={()=>onHandleClick(false)}
            >
              Previous
            </Button>
            {current < steps.length - 1 ? (
              <Button type="primary" onClick={()=>onHandleClick(true)}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Stepper;

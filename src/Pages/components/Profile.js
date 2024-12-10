import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import { FaCamera, FaEdit } from "react-icons/fa";
import Sidebar from "../common/Sidebar1";
import { useForm } from "react-hook-form";
import Select from "react-select";

const { Step } = Steps;

const ProfilePage = () => {
  const initialUserData = {
    firstName: "John doe",
    email: "admin@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [images, setImages] = useState([null, null, null, null, null, null]);
  const [formData, setFormData] = useState({
    education: "",
    relationshipStatus: "",
    relationshipType: "",
    zodiac: "",
    wantChild: "",
    personalityTypes: "",
    communicationStyle: "",
    receivedLove: "",
    pets: "",
    drinkingHabits: "",
    smokeHabits: "",
    exercise: "",
    dietary: "",
    sleepingHabits: "",
    relationshipTerm: "",
    socialTime: "",
  });

  const [options, setOptions] = useState({
    education: [],
    zodiac: [],
    wantChild: [],
    relationshipStatus: [],
    personalityTypes: [],
    relationshipType: [],
    relationshipTerm: [],
    communicationStyles: [],
    receivedLove: [],
    pets: [],
    drinkingHabits: [],
    smokeHabits: [],
    exercise: [],
    dietary: [],
    sleepingHabits: [],
    socialTime: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const handleUIChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = (data) => {};

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Store the file as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = (index) => {
    document.getElementById(`file-input-${index}`).click();
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  //for step 2
  const getid = localStorage.getItem("id");

  const fetchProfileData = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/profile/update/${getid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setOptions(result);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (data) => {
    fetchProfileData(data);
  };

  // Step 1: User Information and Photos
  const step1 = (
    <>
      <div className="w-96 mx-auto bg-black text-white rounded-lg p-5 mb-6">
        <div className="flex justify-around mb-5">
          <button className="text-white font-semibold border-b-2 border-pink-300">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-28 h-28 border-2 ${
                image ? "border-gray-500" : "border-pink-300 border-dashed"
              } rounded-lg flex justify-center items-center`}
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1 right-1 bg-pink-300 text-white w-5 h-5 flex items-center justify-center rounded-full text-sm"
                  >
                    ×
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleAddImage(index)}
                  className="text-pink-300 text-2xl font-bold"
                >
                  +
                </button>
              )}
              <input
                type="file"
                id={`file-input-${index}`}
                onChange={(e) => handleImageChange(index, e)}
                style={{ display: "none" }}
                accept="image/*"
              />
            </div>
          ))}
        </div>
        <button className="w-full bg-pink-500 py-2 rounded-full text-white font-bold">
          Save
        </button>
      </div>

      

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <form onSubmit={handleSave} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUIChange}
              disabled
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-full flex">
              Interested Gender:
            </label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("interestedGender", option?.value)}
              className={`w-full backdrop-blur-md bg-white/40 bg-opacity-10 z-10${
                errors.interestedGender ? " border-red-500" : ""
              }`}
              placeholder="Select Interested Gender"
            />
            {errors.interestedGender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.interestedGender.message}
              </p>
            )}
          </div>

          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-full flex">
              Date of Birth:
            </label>
            <input
              {...register("dob", { required: "Date of Birth is required." })}
              id="dob"
              type="date"
              className={`mt-1 w-full p-2 border border-gray-300 rounded-md`}
              placeholder="Date of Birth"
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={userData.jobTitle}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Height
            </label>
            <input
              type="text"
              name="height"
              value={userData.height}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              School Name Or Collage Name
            </label>
            <input
              type="text"
              name="schoolOrCollageName"
              value={userData.schoolOrCollageName}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name 
            </label>
            <input
              type="text"
              name="companyName"
              value={userData.companyName}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City Name 
            </label>
            <input
              type="text"
              name="cityName"
              value={userData.cityName}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Region 
            </label>
            <input
              type="text"
              name="region"
              value={userData.region}
              onChange={handleUIChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </form>
      </div>
    </>
  );

  // Step 2: Other Details
  const step2 = (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Other Details</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select your education
              </option>
              {options.education.map((education, index) => (
                <option key={index} value={education}>
                  {education}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Open to
            </label>
            <select
              name="relationshipType"
              value={formData.relationshipType}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                what's your relationship type
              </option>
              {options.relationshipType.map((relationshipType, index) => (
                <option key={index} value={relationshipType}>
                  {relationshipType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zodiac Sign
            </label>
            <select
              name="zodiacSign"
              value={formData.zodiac}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select your zodiac sign
              </option>
              {options.zodiac.map((zodiac, index) => (
                <option key={index} value={zodiac}>
                  {zodiac}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Family plans
            </label>
            <select
              name="wantChild"
              value={formData.wantChild}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                what's your family plan
              </option>
              {options.wantChild.map((wantChild, index) => (
                <option key={index} value={wantChild}>
                  {wantChild}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Personality Type
            </label>
            <select
              name="personality"
              value={formData.personalityTypes}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select your personality ype
              </option>
              {options.personalityTypes.map((personalityTypes, index) => (
                <option key={index} value={personalityTypes}>
                  {personalityTypes}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication Style
            </label>
            <select
              name="communicationStyle"
              value={formData.communicationStyle}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select your communication style
              </option>
              {options.communicationStyles.map((communicationStyles, index) => (
                <option key={index} value={communicationStyles}>
                  {communicationStyles}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Love Style
            </label>
            <select
              name="receivedLove"
              value={formData.receivedLove}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                What's your love style
              </option>
              {options.receivedLove.map((receivedLove, index) => (
                <option key={index} value={receivedLove}>
                  {receivedLove}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pets
            </label>
            <select
              name="pets"
              value={formData.pets}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                What pets would you like to own 
              </option>
              {options.pets.map((pets, index) => (
                <option key={index} value={pets}>
                  {pets}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Drinking Habits
            </label>
            <select
              name="drinkingHabits"
              value={formData.drinkingHabits}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                What's your drinking habits
              </option>
              {options.drinkingHabits.map((drinkingHabits, index) => (
                <option key={index} value={drinkingHabits}>
                  {drinkingHabits}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Smoking
            </label>
            <select
              name="smokeHabits"
              value={formData.smokeHabits}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select your smoking habits
              </option>
              {options.smokeHabits.map((smokeHabits, index) => (
                <option key={index} value={smokeHabits}>
                  {smokeHabits}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exercise
            </label>
            <select
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                How often do you exercise
              </option>
              {options.exercise.map((exercise, index) => (
                <option key={index} value={exercise}>
                  {exercise}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dietary Preference
            </label>
            <select
              name="dietary"
              value={formData.dietary}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                What's your dietary preference
              </option>
              {options.dietary.map((dietary, index) => (
                <option key={index} value={dietary}>
                  {dietary}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sleeping Habits
            </label>
            <select
              name="sleepingHabits"
              value={formData.sleepingHabits}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                What's your sleeping habits
              </option>
              {options.sleepingHabits.map((sleepingHabits, index) => (
                <option key={index} value={sleepingHabits}>
                  {sleepingHabits}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label>

          </label>
        </div>
      </form>
    </div>
  );

  const [current, setCurrent] = useState(0);

  // const next = () => {
  //   setCurrent(current + 1);
  // };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  let onHandleClick = (params) => {
    if (params) {
      setCurrent(current + 1);
    } else {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="steps-content">{current === 0 ? step1 : step2}</div>

        <div className="steps-action">
          {current > 0 && (
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => onHandleClick(false)}
            >
              Previous
            </Button>
          )}
          {current < 1 && (
            <Button type="primary" onClick={() => onHandleClick(true)}>
              Next
            </Button>
          )}
          {current === 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Profile Updated!")}
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  HeartOutlined,
  MessageOutlined,
  UserAddOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Card,
  Input,
  Form,
  Select,
  DatePicker,
  Button,
} from "antd";
import { FaCamera, FaEdit } from "react-icons/fa";


const { Header, Content, Sider, Footer } = Layout;

const items1 = ["Home", "Matches", "Messages", "Profile", "Settings"].map(
  (key, index) => ({
    key: String(index + 1),
    label: key,
  })
);

const items2 = [
  { key: "sub1", icon: React.createElement(UserOutlined), label: "My Profile" },
  { key: "sub2", icon: React.createElement(HeartOutlined), label: "Favorites" },
  { key: "sub3", icon: React.createElement(MessageOutlined), label: "Chats" },
  {
    key: "sub4",
    icon: React.createElement(UserAddOutlined),
    label: "Find Matches",
  },
  {
    key: "sub5",
    icon: React.createElement(SettingOutlined),
    label: "Settings",
  },
];

const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState("sub1");
    const [genderOptions, setGenderOptions] = useState([]);
    const [relationshipterm, setRelationshipterm] = useState([]);
    const [relationshiptype, setRelationshiptype] = useState([]);
    const [familyPlanOptions, setFamilyPlanOptions] = useState([]);

  
   
    const handleMenuClick = (e) => {
      setSelectedKey(e.key);
    };
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
      watch,
    } = useForm();
  
    const hobbiesOptions = [
      { value: "reading", label: "Reading" },
      { value: "traveling", label: "Traveling" },
      { value: "gaming", label: "Gaming" },
      // Add more hobbies as needed
    ];

    const { fields: zodiacFields, append: appendZodiac, remove: removeZodiac } = useFieldArray({
        control,
        name: "zodiacSigns"
      });
      
      const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "educationLevels"
      });
      
      const { fields: familyPlanFields, append: appendFamilyPlan, remove: removeFamilyPlan } = useFieldArray({
        control,
        name: "familyPlans"
      });
    
      const [zodiacOptions, setZodiacOptions] = useState([]);
      const [educationOptions, setEducationOptions] = useState([]);
      const [personalityType, setPersonalityType] = useState([]);
    
      useEffect(() => {
        // Fetch zodiac signs
        const fetchZodiacSigns = async () => {
          const response = await fetch("/api/zodiac-signs"); // Replace with your actual API
          const data = await response.json();
          setZodiacOptions(data);
        };
    
        // Fetch education levels
        const fetchEducationLevels = async () => {
          const response = await fetch("/api/education-levels"); 
          const data = await response.json();
          setEducationOptions(data);
        };
    
        // Fetch family plans
        const fetchFamilyPlans = async () => {
          const response = await fetch("/api/family-plans"); 
          const data = await response.json();
          setFamilyPlanOptions(data);
        };

        const fetchPersonalitytype = async () => {
          const response = await fetch("/api/family-plans"); 
          const data = await response.json();
          setPersonalityType(data);
        };
    
        fetchZodiacSigns();
        fetchEducationLevels();
        fetchFamilyPlans();
        fetchPersonalitytype();
      }, []);
    
  
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
      className="flex items-center"
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout>
          <Sider
           className="bg-contain h-screen"
            width={300}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
          className="flex justify-center h-full"
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
          <Card className="p-6 m-0 min-h-72 w-1/3 bg-white rounded-lg text-lg font-medium">
              {selectedKey === "sub1" ? (
                <Form layout="vertical">
                  {/* <div className="flex justify-center mb-4 relative">
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
                  </div> */}
                  <div className="mb-1 items-start">
                    <label
                      className="text-gray-700 mr-3 w-32 flex"
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
                      <p className="text-red-500 text-sm">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label
                      className="text-gray-700 mr-3 w-24 flex"
                      htmlFor="lastname"
                    >
                      Last Name:
                    </label>
                    <input
                      {...register("lastname", {
                        required: "Last Name is required.",
                      })}
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

                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-24 flex">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      {...register("dateOfBirth", {
                        required: "Date of Birth is required.",
                      })}
                      max="2100-12-31"
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
                      // disabled
                      className={`border rounded-lg w-full py-2 px-3 h-10 text-gray-700 focus:outline-none focus:ring-2 transition ${
                        errors.age
                          ? "border-red-500 focus:ring-red-300"
                          : "focus:ring-pink-200"
                      }`}
                      placeholder="Age"
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-24 flex">
                      Gender:
                    </label>
                    <Select
                      options={genderOptions.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))} 
                      onChange={(option) => setValue("gender", option)}
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-20 ${
                        errors.gender ? "border-red-500" : ""
                      } border border-transparent`}
                      placeholder="Select Gender"
                    />
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-full flex">
                      Interested Gender:
                    </label>
                    <Select
                      options={genderOptions}
                      onChange={(option) =>
                        setValue("interestedGender", option)
                      }
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-10${
                        errors.interestedGender ? "border-red-500" : ""
                      }`}
                      placeholder="Select Interested Gender"
                    />
                    {errors.interestedGender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.interestedGender.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-24 flex">
                      Hobbies:
                    </label>
                    <Select
                      options={hobbiesOptions}
                      isMulti
                      onChange={(options) => setValue("hobbies", options)}
                      className={`w-full h-10${
                        errors.hobbies ? "border-red-500" : ""
                      }`}
                      placeholder="Select or create hobbies"
                    />
                    {errors.hobbies && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.hobbies.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-full flex">
                      Relationship term:
                    </label>
                    <Select
                      options={relationshipterm.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))} 
                      onChange={(option) => setValue("relationshipterm", option)}
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-20 ${
                        errors.relationshipterm ? "border-red-500" : ""
                      } border border-transparent`}
                      placeholder="Select Relationship-term"
                    />
                    {errors.relationshipterm && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.relationshipterm.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-full flex">
                      Relationship Type:
                    </label>
                    <Select
                      options={relationshiptype.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))} 
                      onChange={(option) => setValue("relationshiptype", option)}
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-20 ${
                        errors.relationshiptype ? "border-red-500" : ""
                      } border border-transparent`}
                      placeholder="Select Relationship-type"
                    />
                    {errors.relationshiptype && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.relationshiptype.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-full flex">
                      Zodiac Sign:
                    </label>
                    <Select
                      options={zodiacOptions.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))} 
                      onChange={(option) => setValue("zodiacOptions", option)}
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-20 ${
                        errors.setZodiacOptions ? "border-red-500" : ""
                      } border border-transparent`}
                      placeholder="Select Relationship-type"
                    />
                    {errors.zodiacOptions && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zodiacOptions.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-full flex">
                    Education Levels:
                    </label>
                    <Select
                      options={educationOptions.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))} 
                      onChange={(option) => setValue("educationOptions", option)}
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-20 ${
                        errors.setEducationOptions ? "border-red-500" : ""
                      } border border-transparent`}
                      placeholder="Select Relationship-type"
                    />
                    {errors.educationOptions && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.educationOptions.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-full flex">
                    Family Plans:
                    </label>
                    <Select
                      options={familyPlanOptions.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))} 
                      onChange={(option) => setValue("familyPlanOptions", option)}
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-20 ${
                        errors.setFamilyPlanOptions ? "border-red-500" : ""
                      } border border-transparent`}
                      placeholder="Select Relationship-type"
                    />
                    {errors.familyPlanOptions && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.familyPlanOptions.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-full flex">
                    Personality Type:
                    </label>
                    <Select
                      options={personalityType.map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))} 
                      onChange={(option) => setValue("personalityType", option)}
                      className={`w-full backdrop-blur-md h-10 bg-white/40 bg-opacity-10 z-20 ${
                        errors.setPersonalityType ? "border-red-500" : ""
                      } border border-transparent`}
                      placeholder="Select Personality-type"
                    />
                    {errors.personalityType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.personalityType.message}
                      </p>
                    )}
                  </div>
                  
                 
                </Form>
              ) : (
                <div>
                  <h2>
                    {selectedKey === "sub2" ? "Favorites" : "Other Content"}
                  </h2>
                  <p>Content for {selectedKey}</p>
                </div>
              )}
            </Card>
          </Content>
        </Layout>
      </Content>
      <Footer
      className="text-center"
      >
        Dating App ©{new Date().getFullYear()} Created by Intern team
      </Footer>
    </Layout>
  );
};
export default Sidebar;
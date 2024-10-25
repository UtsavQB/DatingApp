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
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

const Sidebar1 = () => {
  const [selectedKey, setSelectedKey] = useState("sub1");
  // const [genderOptions, setGenderOptions] = useState([]);
  // const [relationshipterm, setRelationshipterm] = useState([]);
  // const [relationshiptype, setRelationshiptype] = useState([]);
  // const [familyPlanOptions, setFamilyPlanOptions] = useState([]);

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
  ];

  const countryCodes = [
    { code: "+91", label: "India" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+61", label: "Australia" },
    { code: "+81", label: "Japan" },
    { code: "+49", label: "Germany" },
    { code: "+33", label: "France" },
    { code: "+39", label: "Italy" },
    { code: "+7", label: "Russia" },
    { code: "+86", label: "China" },
    { code: "+41", label: "Switzerland" },
    { code: "+34", label: "Spain" },
    { code: "+27", label: "South Africa" },
    { code: "+62", label: "Indonesia" },
    { code: "+55", label: "Brazil" },
    { code: "+971", label: "UAE" },
    // Add more country codes as needed
  ];
  

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header className="flex items-center">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
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
          <Sider className="bg-contain h-screen" width={300}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content
            className="flex justify-center h-full"
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Card className="p-6 m-0 min-h-72 w-1/3 bg-white rounded-lg text-lg font-medium">
              {selectedKey === "sub5" ? (
                <Form layout="vertical">
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
                    <label
                      className="text-gray-700 mr-3 w-24 flex"
                      htmlFor="lastname"
                    >
                      Username:
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
                      Email:
                    </label>
                    <div className="flex-1">
                      <input
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Please enter a valid email address.",
                          },
                        })}
                        id="email"
                        className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                          errors.email
                            ? "border-red-500 focus:ring-red-300"
                            : "focus:ring-pink-200"
                        }`}
                        placeholder="example@mail.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-1 items-center">
                    <label className="text-gray-700 mr-3 w-24 flex">
                      Phone:
                    </label>
                    <div className="flex-1 flex items-center">
                      <select
                        {...register("countryCode", {
                          required: "Country code is required.",
                        })}
                        className={`border rounded-l-lg py-2 px-0 text-gray-700 focus:outline-none focus:ring-2 ${
                          errors.countryCode
                            ? "border-red-500 focus:ring-red-300"
                            : "focus:ring-pink-200"
                        }`}
                      >
                        {countryCodes.map(({ code, label }) => (
                          <option key={code} value={code}>
                            {code} ({label})
                          </option>
                        ))}
                      </select>
                      <input
                        {...register("phone", {
                          required: "Phone number is required.",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid phone number.",
                          },
                        })}
                        id="phone"
                        className={`border rounded-r-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-300"
                            : "focus:ring-pink-200"
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.countryCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.countryCode.message}
                      </p>
                    )}
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-24 bg-pink-600 mt-3 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-200"
                  >
                    Save Changes
                  </button>
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
      <Footer className="text-center">
        Dating App ©{new Date().getFullYear()} Created by Intern team
      </Footer>
    </Layout>
  );
};
export default Sidebar1;

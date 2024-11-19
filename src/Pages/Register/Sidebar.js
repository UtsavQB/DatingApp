import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar1 from "../common/Sidebar1"; // Import your Sidebar1 component
import { Layout, Card, Form, Button } from "antd";

const { Content } = Layout;

const ProfilePage = () => {
  const [selectedKey, setSelectedKey] = useState("sub1");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar1 selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      <Layout>
        <Content
          style={{
            padding: "24px",
            minHeight: 280,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card className="p-6 m-0 min-h-72 w-1/3 bg-white rounded-lg text-lg font-medium">
            {selectedKey === "sub5" ? (
              <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item label="First Name" required>
                  <input
                    {...register("firstname", {
                      required: "First Name is required.",
                    })}
                    className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                      errors.firstname ? "border-red-500" : ""
                    }`}
                    placeholder="First Name"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-sm">
                      {errors.firstname.message}
                    </p>
                  )}
                </Form.Item>
                <Form.Item label="Last Name" required>
                  <input
                    {...register("lastname", {
                      required: "Last Name is required.",
                    })}
                    className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                      errors.lastname ? "border-red-500" : ""
                    }`}
                    placeholder="Last Name"
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-sm">
                      {errors.lastname.message}
                    </p>
                  )}
                </Form.Item>
                <Form.Item label="E-mail" required>
                  <input
                    {...register("email", {
                      required: "email is required.",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                    className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </Form.Item>
                <Form.Item label="Phone No." required>
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
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
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
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
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
    </Layout>
  );
};

export default ProfilePage;

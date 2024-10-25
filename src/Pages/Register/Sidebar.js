// ProfilePage.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Form, Input, Button } from "antd";

const ProfilePage = () => {
  const renderContent = (selectedKey) => {
    if (selectedKey === "sub5") {
      return (
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input placeholder="Last Name" />
          </Form.Item>
          <Button type="primary">Save Changes</Button>
        </Form>
      );
    }
    return <div>Content for {selectedKey}</div>;
  };

  return (
    <Sidebar children={renderContent} />
  );
};

export default ProfilePage;

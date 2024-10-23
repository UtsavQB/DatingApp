import React from 'react';
import { HeartOutlined, MessageOutlined, UserAddOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;

const items1 = ['Home', 'Matches', 'Messages', 'Profile', 'Settings'].map((key, index) => ({
  key: String(index + 1),
  label: key,
}));

const items2 = [
  { icon: UserOutlined, label: 'My Profile' },
  { icon: UserOutlined, label: 'Interests' },
  { icon: HeartOutlined, label: 'Favorites' },
  { icon: MessageOutlined, label: 'Chats' },
  { icon: UserAddOutlined, label: 'Find Matches' },
  { icon: SettingOutlined, label: 'Settings' },
].map((item, index) => ({
  key: `sub${index + 1}`,
  icon: React.createElement(item.icon),
  label: item.label,
}));

const Sidebar = () => {
  return (
    <Layout>
      <Header className="flex items-center	">
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} className='bg-contain'>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className='h-full z-0'
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[
              { title: 'Home' },
              { title: 'Matches' },
            ]}
            style={{ margin: '16px 0' }}
          />
          <Content
            className='p-6 m-0 min-h-72	bg-contain bg-white rounded-lg'
          >
            card
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Sidebar;

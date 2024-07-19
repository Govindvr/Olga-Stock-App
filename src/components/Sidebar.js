import React from 'react';
import { Flex, Menu } from 'antd';
import myIcon from '../assets/logo.svg';
import {
  UserOutlined,
  LineChartOutlined,
  SettingOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const Sidebar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <img src={myIcon} width={80} height={80} />
        </div>
      </Flex>
      <Menu
        mode="inline"
        className="menu-bar"
        onClick={({ key }) => {
          if (key === 'signout') {
            signOut();
            navigate('/');
            window.location.reload();
          } else {
            navigate(key);
          }
        }}
        defaultSelectedKeys={window.location.pathname}
        items={[
          {
            key: '/',
            icon: <UserOutlined />,
            label: 'Dashboard',
          },
          {
            key: '/report',
            icon: <LineChartOutlined />,
            label: 'Report',
          },
          {
            key: '/admin',
            icon: <SettingOutlined />,
            label: 'Admin',
          },
          {
            key: 'signout',
            icon: <LoginOutlined />,
            label: 'Signout',
          },
        ]}
      />
    </>
  );
};

export default Sidebar;

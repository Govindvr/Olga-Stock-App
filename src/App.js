import './App.css';
import React, { useState } from 'react';
import { Flex, Button, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar';
import CustomHeader from './components/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import RequireAuth from '@auth-kit/react-router/RequireAuth';

import MainContent from './components/MainContent';
import ProductContent from './components/ProductContent';
import ReportContent from './components/ReportContent';
import AdminContent from './components/AdminContent';
import LoginPage from './components/LoginPage';

const { Sider, Header, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  return (
    <Flex>
      <Layout>
      {!isLoginPage && (
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider"
        >
          <Sidebar />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-btn"
          />
        </Sider>
      )}
      <Layout>
        <Header className="header">
          <CustomHeader />
        </Header>

        <Content className="content">
          <Flex gap="large">
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth fallbackPath="/login">
                    <MainContent />
                  </RequireAuth>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <RequireAuth fallbackPath="/login">
                    <ProductContent />
                  </RequireAuth>
                }
              />
              <Route
                path="/report"
                element={
                  <RequireAuth fallbackPath="/login">
                    <ReportContent />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAuth fallbackPath="/login">
                    <AdminContent />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Flex>
        </Content>
      </Layout>
    </Layout>
    </Flex>
    
  );
}

export default App;

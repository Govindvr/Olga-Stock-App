import React, { useState } from 'react';
import { Flex, Card, Button, Alert, Form, Input } from 'antd';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env;

const LoginPage = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const signIn = useSignIn();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const url = REACT_APP_API_URL + '/auth/login';
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if(signIn({
              auth: {
                  token: data.data.token,
                  type: 'Bearer'
              },
              userState: {name: 'Olga', uid: 1611},

          })){
              navigate('/');
          }else {
            setAlertVisible(true);
            setAlertMessage('Login Failed');
            setAlertType('error');
            setAlertDescription('Login Error');
          }
          } else {
            setAlertVisible(true);
            setAlertMessage('Login Failed');
            setAlertType('error');
            setAlertDescription(data.message);
          }
        });
            setAlertVisible(true);
    } catch (error) {
      setAlertVisible(true);
      setAlertMessage('Login Failed');
      setAlertType('error');
      setAlertDescription('Login Error');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ flex: 1 }}>
      <Flex vertical gap="2.3rem">
        <Card style={{ padding: '20px' }}>
          {alertVisible && (
            <Alert
              message={alertMessage}
              description={alertDescription}
              type={alertType}
              closable
              onClose={handleCloseAlert}
            />
          )}
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  );
};

export default LoginPage;

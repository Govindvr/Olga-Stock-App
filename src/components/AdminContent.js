import React from 'react';
import { Button, Form, Input, Space, Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const AdminContent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const url = REACT_APP_API_URL + '/api/stock/products/addProduct';
    values['current_stock'] = 0;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/');
      });
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ flex: 1 }}>
      <Flex vertical gap="2.3rem">
        <Card style={{ padding: '20px' }}>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="code"
              label="Code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  );
};

export default AdminContent;

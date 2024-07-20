import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Space,
  Card,
  Flex,
  DatePicker,
  Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env;
const dayjs = require('dayjs');

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
  const [form2] = Form.useForm();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

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

  const onDelete = async (values) => {
    const startDate = values.DatePicker;
    const body = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      product_id: parseInt(values.product),
    };

    const url = REACT_APP_API_URL + '/api/stock/transaction/delete';
    // Handle the delete logic here using formattedDates
    try {
       await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const url = REACT_APP_API_URL + '/api/stock/products/listProducts';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const options = products.map((product) => ({
    value: product.product_id.toString(),
    label: product.name,
  }));

  return (
    <div style={{ flex: 1 }}>
      <Flex vertical gap="2.3rem">
        <Card style={{ padding: '20px' }} title="Add Products">
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
      <Flex vertical gap="2.3rem">
        <Card style={{ padding: '20px' }} title="Delete Entries">
          <Form
            {...layout}
            form={form2}
            name="Delete Form"
            onFinish={onDelete}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              label="Select Product"
              name="product"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={options}
              />
            </Form.Item>
            <Form.Item
              label="DatePicker"
              name="DatePicker"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <DatePicker />
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

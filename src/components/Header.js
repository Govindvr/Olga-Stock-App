import { Avatar, Flex, Typography, Space } from 'antd';
import React from 'react';
import { Input } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';

const CustomHeader = () => {
  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={3} type="secondary">
        Olga Concrete Blocks
      </Typography.Title>
      <Space.Compact size="large">
        <Input addonBefore={<SearchOutlined /> } placeholder="large size" />
      </Space.Compact>

      <Flex align="center" gap="3rem">
        <Avatar icon={<UserOutlined />} />
      </Flex>
    </Flex>
  );
};

export default CustomHeader;

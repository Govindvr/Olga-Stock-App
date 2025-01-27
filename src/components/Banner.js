import { Card, Flex, Typography } from 'antd';
import React from 'react';

const Banner = () => {
  return (
    <Card style={{ padding: '20px' }}>
      <Flex vertical gap="30px">
        <Flex vertical align="flex-start">
          <Typography.Title level={2} strong>
            Products
          </Typography.Title>
          <Typography.Text type="secondary" strong>
            Browse Products and choose the product.
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Banner;

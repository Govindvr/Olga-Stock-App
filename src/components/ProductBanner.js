import React from 'react';
import { Card, Flex, Typography, Tag } from 'antd';

const ProductBanner = (props) => {
  return (
    <Card style={{ padding: '10px' }}>
      <Flex vertical gap="10px">
        <Flex vertical align="flex-start">
          <Typography.Title level={2} strong>
            {props.name}
          </Typography.Title>
          <Typography.Title type="secondary" level={4} strong>
            Code:
            <Tag color="geekblue" key={props.code}>
              {props.code}
            </Tag>
          </Typography.Title>
          <Typography.Title type="secondary" level={4} strong>
            Stock:
            <Tag color="green" key={props.code}>
              {props.current_stock}
            </Tag>
          </Typography.Title>
        </Flex>
      </Flex>
      <Flex justify="space-evenly">
        <Card title="Batch 1" size="small" style={{ textAlign: 'center' }}>
          <Typography.Text level={4}>
            <Tag color="green" key={props.batchBalance.b1}>
              {props.batchBalance.b1}
            </Tag>
          </Typography.Text>
        </Card>
        <Card title="Batch 2" size="small" style={{ textAlign: 'center' }}>
          <Typography.Text level={4}>
            <Tag color="red" key={props.batchBalance.b2}>
              {props.batchBalance.b2}
            </Tag>
          </Typography.Text>
        </Card>
        <Card title="Batch 3" size="small" style={{ textAlign: 'center' }}>
          <Typography.Text level={4}>
            <Tag color="warning" key={props.batchBalance.b3}>
              {props.batchBalance.b3}
            </Tag>
          </Typography.Text>
        </Card>
    
      </Flex>
    </Card>
  );
};

export default ProductBanner;

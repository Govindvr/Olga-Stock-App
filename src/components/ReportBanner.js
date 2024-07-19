import React from 'react';
import { Card, Flex, Typography, DatePicker, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import {convertDateTime} from '../utils/convertDateTime'

const dayjs = require('dayjs');


const ReportBanner = (props) => {
  const onChange = (date, dateString) => {
    dateString += '-02';
    props.setDate(dateString);
  };
  return (
    <Card style={{ padding: '20px' }}>
      <Flex vertical gap="30px">
        <Flex vertical align="flex-start">
          <Typography.Title level={2} strong>
            Report
          </Typography.Title>
          <Typography.Text type="secondary" strong>
            Report for Stock for Month Generated on {convertDateTime(dayjs())}.
          </Typography.Text>
          <Flex align="flex-start" justify="space-around" gap={200}>
            <div>
              <Typography.Text type="secondary" strong>
                Choose Month and Year :{' '}
              </Typography.Text>
              <DatePicker
                onChange={onChange}
                picker="month"
                defaultValue={dayjs()}
                allowClear={false}
              />
            </div>
            <div>
              <Button
                type="primary"
                onClick={props.handlePrint}
                icon={<PrinterOutlined />}
              >
                Print Report
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ReportBanner;

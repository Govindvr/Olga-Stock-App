import React, { useState, useEffect, useRef } from 'react';
import ReportBanner from './ReportBanner';
import { Flex, Table, Tag, Card, Typography } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { convertDateTime } from '../utils/convertDateTime';

const { Column } = Table;
const dayjs = require('dayjs');
const { REACT_APP_API_URL } = process.env;

const ReportContent = () => {
  const [SelectedDate, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [reportData, setReportData] = useState({});
  const [load, setLoad] = useState(true);

  const componentRef = useRef();

  useEffect(() => {
    const url =
      REACT_APP_API_URL +
      `/api/stock/transaction/getReport?date="${encodeURIComponent(
        SelectedDate,
      )}"`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReportData(data.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [SelectedDate]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `StockReport`,
  });

  return (
    <div style={{ flex: 1 }} ref={componentRef}>
      <Flex vertical gap="2.3rem">
        <ReportBanner
          setDate={setDate}
          SelectedDate={SelectedDate}
          handlePrint={handlePrint}
        />
        <Card style={{ padding: '10px' }} loading={load}>
          {Object.keys(reportData).map((name) => (
            <Card
              title={name}
              headStyle={{ backgroundColor: '#3c3b40', color: '#ffffff' }}
            >
              <Table
                dataSource={reportData[name].data}
                rowHoverable
                loading={load}
                pagination={false}
                bordered
              >
                <Column
                  title="Name"
                  dataIndex="name"
                  key="name"
                  render={() => name}
                />
                <Column
                  title="Date"
                  dataIndex="transaction_date"
                  key="transaction_date"
                  render={(transaction_date) =>
                    convertDateTime(transaction_date)
                  }
                />
                <Column
                  title="IN"
                  dataIndex="quantity"
                  key="quantity"
                  render={(quantity, row) => {
                    if (row.transaction_type === 'ADD') {
                      return quantity;
                    } else {
                      return '-';
                    }
                  }}
                />
                <Column
                  title="OUT"
                  dataIndex="quantity"
                  key="quantity"
                  render={(quantity, row) => {
                    if (row.transaction_type === 'SELL') {
                      return quantity;
                    } else {
                      return '-';
                    }
                  }}
                />
                <Column
                  title="LOST"
                  dataIndex="quantity"
                  key="quantity"
                  render={(quantity, row) => {
                    if (row.transaction_type === 'LOST') {
                      return quantity;
                    } else {
                      return '-';
                    }
                  }}
                />
                <Column title="B1" dataIndex="b1" key="b1" />
                <Column title="B2" dataIndex="b2" key="b2" />
                <Column title="B3" dataIndex="b3" key="b3" />
                <Column
                  title="Balance"
                  dataIndex="balance_stock"
                  key="balance_stock"
                />
              </Table>
              <Flex justify="space-evenly">
                <Card
                  title="Total Add"
                  size="small"
                  style={{ textAlign: 'center' }}
                >
                  <Typography.Text level={4}>
                    <Tag color="#87d068" key={reportData[name].total_add}>
                      {reportData[name].total_add}
                    </Tag>
                  </Typography.Text>
                </Card>
                <Card
                  title="Total Sold"
                  size="small"
                  style={{ textAlign: 'center' }}
                >
                  <Typography.Text level={4}>
                    <Tag color="red" key={reportData[name].total_sold}>
                      {reportData[name].total_sold}
                    </Tag>
                  </Typography.Text>
                </Card>
                <Card
                  title="Total Lost"
                  size="small"
                  style={{ textAlign: 'center' }}
                >
                  <Typography.Text level={4}>
                    <Tag color="#c4ae2f" key={reportData[name].total_lost}>
                      {reportData[name].total_lost}
                    </Tag>
                  </Typography.Text>
                </Card>
                <Card
                  title="Balance"
                  size="small"
                  style={{ textAlign: 'center' }}
                >
                  <Typography.Text level={4}>
                    <Tag color="blue" key={reportData[name].current_stock}>
                      {reportData[name].current_stock}
                    </Tag>
                  </Typography.Text>
                </Card>
              </Flex>
            </Card>
          ))}
        </Card>
      </Flex>
    </div>
  );
};

export default ReportContent;

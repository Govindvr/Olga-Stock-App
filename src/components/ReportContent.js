import React, { useState, useEffect, useRef } from 'react';
import ReportBanner from './ReportBanner';
import { Flex, Table, Card } from 'antd';
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
    <div style={{ flex: 1 }} ref={componentRef} className="print-container">
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
                <Card title="Sales" size="small">
                  <p>Total Add : {reportData[name].total_add}</p>
                  <p>Total Sold : {reportData[name].total_sold}</p>
                  <p>Total Lost : {reportData[name].total_lost}</p>
                </Card>
                <Card title="Balance" size="small">
                  <p>Balance : {reportData[name].current_stock}</p>
                  <p>
                    B1 :{' '}
                    {
                      reportData[name].data[reportData[name].data.length - 1][
                        'b1'
                      ]
                    }
                  </p>
                  <p>
                    B2 :{' '}
                    {
                      reportData[name].data[reportData[name].data.length - 1][
                        'b2'
                      ]
                    }
                  </p>
                  <p>
                    B3 :{' '}
                    {
                      reportData[name].data[reportData[name].data.length - 1][
                        'b3'
                      ]
                    }
                  </p>
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

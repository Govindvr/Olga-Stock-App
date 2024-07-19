import React, { useState, useEffect } from 'react';
import ProductBanner from './ProductBanner';
import SubmitModal from './SubmitModal';
import { useLocation } from 'react-router-dom';
import { Flex, Card, Table, Tag, DatePicker, Typography } from 'antd';
import { convertDateTime } from '../utils/convertDateTime';

const dayjs = require('dayjs');

const { Column } = Table;
const { REACT_APP_API_URL } = process.env;

const ProductContent = () => {
  const location = useLocation();
  const props = location.state;
  const [balance, setBalance] = useState(props.current_stock);
  const [load, setLoad] = useState(true);
  const [batchBalance, setBatchBalance] = useState({});

  const [SelectedDate, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const [productData, setProductData] = useState({});
  const [entry, setEntry] = useState(false);
  function handleState() {
    setEntry(true);
  }

  const onChange = (date, dateString) => {
    dateString += '-02';
    setDate(dateString);
  };

  useEffect(() => {
    const url =
    REACT_APP_API_URL +
    `/api/stock/transaction/getProductStock?id=${encodeURIComponent(
      props.product_id,
    )}&date="${encodeURIComponent(SelectedDate)}"`;
  const url1 =
    REACT_APP_API_URL +
    `/api/stock/products/getBalance?id=${encodeURIComponent(
      props.product_id,
    )}&date="${encodeURIComponent(SelectedDate)}"`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        setBalance(data.data.balance_stock);
        setBatchBalance(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setEntry(false);
  }, [SelectedDate, entry, props.product_id]);

  return (
    <div style={{ flex: 1 }}>
      <Flex vertical gap="2.3rem">
        <ProductBanner
          name={props.name}
          code={props.code}
          current_stock={balance}
          setDate={setDate}
          batchBalance={batchBalance}
        />
        <Card style={{ padding: '10px' }}>
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
              <SubmitModal
                id={props.product_id}
                name={props.name}
                category={props.category}
                setEntry={handleState}
                setBalance={setBalance}
              />
            </div>
          </Flex>
          <Card>
            <Table
              dataSource={productData.result}
              rowHoverable
              loading={load}
              pagination={false}
            >
              <Column
                title="Date"
                dataIndex="transaction_date"
                key="transaction_date"
                render={(transaction_date) => convertDateTime(transaction_date)}
              />
              <Column
                title="Transaction"
                dataIndex="transaction_type"
                key="transaction_type"
                render={(transaction_type) => {
                  let tag_color = 'green';
                  if (transaction_type === 'SELL') {
                    tag_color = 'red';
                  }
                  if (transaction_type === 'LOST') {
                    tag_color = 'warning';
                  }
                  return (
                    <Tag color={tag_color} key={transaction_type}>
                      {transaction_type}
                    </Tag>
                  );
                }}
              />
              <Column
                title="Quantity"
                dataIndex="quantity"
                key="quantity"
                render={(quantity, row) => {
                  let tag_color = 'green';
                  if (row.transaction_type === 'SELL') {
                    tag_color = 'red';
                  }
                  if (row.transaction_type === 'LOST') {
                    tag_color = 'warning';
                  }
                  return (
                    <Tag color={tag_color} key={quantity}>
                      {quantity}
                    </Tag>
                  );
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
          </Card>
          <Flex justify="space-around">
            <Card
              title="Total Add"
              size="small"
              style={{ textAlign: 'center' }}
            >
              <Typography.Text level={4}>
                <Tag color="green" key={productData.total_add}>
                  {productData.total_add}
                </Tag>
              </Typography.Text>
            </Card>
            <Card
              title="Total Sold"
              size="small"
              style={{ textAlign: 'center' }}
            >
              <Typography.Text level={4}>
                <Tag color="red" key={productData.total_sold}>
                  {productData.total_sold}
                </Tag>
              </Typography.Text>
            </Card>
            <Card
              title="Total Lost"
              size="small"
              style={{ textAlign: 'center' }}
            >
              <Typography.Text level={4}>
                <Tag color="warning" key={productData.total_lost}>
                  {productData.total_lost}
                </Tag>
              </Typography.Text>
            </Card>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default ProductContent;

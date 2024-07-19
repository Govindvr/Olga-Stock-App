import React, { useState, useEffect } from 'react';
import { Flex, Card, Table, Tag } from 'antd';
import Banner from './Banner';
import { useNavigate } from 'react-router-dom';

const { Column } = Table;
const { REACT_APP_API_URL } = process.env;

const MainContent = () => {
  const [load, setLoad] = useState(true);
  const [productData, setProductData] = useState({});
  useEffect(() => {
    const url = REACT_APP_API_URL + '/api/stock/products/getProducts';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1 }}>
      <Flex vertical gap="2.3rem">
        <Banner />
        <Card>
          {Object.keys(productData).map((category) => (
            <Card
              title={category}
              headStyle={{ backgroundColor: '#3c3b40', color: '#ffffff' }}
            >
              <Table
                dataSource={productData[category]}
                pagination={false}
                rowHoverable
                loading={load}
                onRow={(r) => ({
                  onClick: () => {
                    const path = '/product/' + r.code;
                    let propsToPass = r;
                    r['category'] = category;
                    navigate(path, { state: propsToPass });
                  },
                })}
              >
                <Column title="Code" dataIndex="code" key="code" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                  title="Stock"
                  dataIndex="current_stock"
                  key="current_stock"
                  render={(current_stock) => (
                    <Tag color="green" key={current_stock}>
                      {current_stock}
                    </Tag>
                  )}
                />
              </Table>
            </Card>
          ))}
        </Card>
      </Flex>
    </div>
  );
};

export default MainContent;

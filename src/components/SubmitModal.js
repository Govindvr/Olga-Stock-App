import React, { useState } from 'react';
import {
  Button,
  Modal,
  Select,
  Flex,
  Typography,
  InputNumber,
  Alert,
  Radio,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { REACT_APP_API_URL } = process.env;

const SubmitModal = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [type, setType] = useState('ADD');
  const [quantity, setQuantity] = useState(0);
  const [batch, setBatch] = useState('b1');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleChange = (value) => {
    setType(value);
  };
  const onChangeNum = (value) => {
    setQuantity(value);
  };

  const showModal = () => {
    setOpen(true);
  };

  const onRadio = (e) => {
    setBatch(e.target.value);
  };

  const handleOk = () => {
    const body_data = {
      id: props.id,
      transaction_type: type,
      quantity: quantity,
      batch: batch
    };

    setConfirmLoading(true);
    const url = REACT_APP_API_URL + '/api/stock/transaction/addStock';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body_data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmLoading(false);
        if (data.success) {
          setAlertType('success');
          setAlertMessage('Success');
          setAlertDescription('Stock transaction was successful.');
          props.setEntry(true);
          props.setBalance(data.data.product_stock);
          setOpen(false);
        } else {
          setAlertType('error');
          setAlertMessage('Error');
          setAlertDescription(data.message);
          setAlertVisible(true);
        }
      })
      .catch((err) => {
        setConfirmLoading(false);
        setAlertType('error');
        setAlertMessage('Error');
        setAlertDescription('There was an error with the stock transaction.');
        setAlertVisible(true);
      });
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Add Transaction
      </Button>
      <Modal
        title="Add Transaction"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {alertVisible && (
          <Alert
            message={alertMessage}
            description={alertDescription}
            type={alertType}
            closable
            onClose={handleCloseAlert}
          />
        )}
        <Flex vertical gap="middle">
          <Typography.Text type="primary" strong>
            Name : {props.name}
          </Typography.Text>
          <Typography.Text type="primary" strong>
            Category : {props.category}
          </Typography.Text>
          <Flex gap="middle">
            <Typography.Text type="primary" strong>
              Choose Batch :
            </Typography.Text>
            <Radio.Group defaultValue="b1" buttonStyle="solid" onChange={onRadio} value={batch}>
              <Radio.Button value="b1">B1</Radio.Button>
              <Radio.Button value="b2">B2</Radio.Button>
              <Radio.Button value="b3">B3</Radio.Button>
            </Radio.Group>
          </Flex>

          <Flex justify="flex-start" gap={'large'}>
            <Typography.Text type="primary" strong>
              Choose Type :
            </Typography.Text>
            <Select
              defaultValue={type}
              style={{
                width: 200,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'ADD',
                  label: 'ADD',
                },
                {
                  value: 'SELL',
                  label: 'SELL',
                },
                {
                  value: 'LOST',
                  label: 'LOST',
                },
              ]}
            />
          </Flex>
          <Flex gap="large">
            <Typography.Text type="primary" strong>
              Quantity :
            </Typography.Text>
            <InputNumber
              min={0}
              size="large"
              defaultValue={quantity}
              onChange={onChangeNum}
            />
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default SubmitModal;

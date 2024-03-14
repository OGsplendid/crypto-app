import { Button, Divider, Form, InputNumber, Result, Select, Space } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import { useState, useContext, useRef } from "react";
import { CryptoContext } from "../context/crypto-context";
import { ICryptoCurrency, IPurchase } from "../models";
import { AppCoinData } from "./AppCoinData";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  amount?: string;
  price?: string;
  total?: string;
  date?: string;
};

const backBtnStyle: React.CSSProperties = {
  marginBottom: 30,
  cursor: 'pointer',
};

export const AddAssetForm = ({ onClose }: { onClose: () => void }) => {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useContext(CryptoContext);
  const [coin, setCoin] = useState<ICryptoCurrency | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const assetRef = useRef<IPurchase>();

  const handleBackBtnClick = () => {
    setSubmitted(false);
    setCoin(null);
  }

  if(submitted) {
    return (
      <>
        <LeftOutlined style={backBtnStyle} onClick={handleBackBtnClick} />
        <Result
          status="success"
          title="You successfully bought the asset"
          subTitle={`You bought ${assetRef.current?.amount} ${coin?.name} by $${assetRef.current?.price}`}
          extra={[
            <Button type="primary" key="console" onClick={onClose}>
              OK
            </Button>,
          ]}
        />
      </>
    )
  }

  const handleSelect = (value: string) => {
    const selectedCoin = crypto.find((c) => c.id === value);
    if (selectedCoin) setCoin(selectedCoin);
  }

  if(!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={handleSelect}
        placeholder="Select coin"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 40 }} src={option.data.icon} alt={option.data.label} /> 
            <h4>{option.data.label}</h4>
          </Space>
        )}
      />
    )
  }

  const onFinish = (values: IPurchase) => {
    const newAsset = {
      amount: +values.amount,
      price: +values.price.toFixed(2),
      date: new Date(),
    }
    assetRef.current = newAsset;
    addAsset(newAsset, coin.id);
    setSubmitted(true);
  }

  const handleAmountChange = () => {
    const amount = form.getFieldValue('amount');
    form.setFieldValue('total', +(amount * coin.price).toFixed(2));
  }

  return (
    <>
      <LeftOutlined style={backBtnStyle} onClick={handleBackBtnClick} />
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        initialValues={{
          price: +coin.price.toFixed(2),
        }}>

        <AppCoinData coin={coin} withSymbol={false} />
        <Divider />

        <Form.Item<FieldType>
          label="Amount"
          name="amount"
          rules={[{ required: true, type: 'number', message: 'Please input amount!' }]}
        >
          <InputNumber 
            style={{ width: '100%' }}
            onChange={handleAmountChange}
            placeholder="Enter amount" 
            min={0.01} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          name="price"
        >
          <InputNumber 
            readOnly
            // value={+coin.price.toFixed(2)}
            style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Total"
          name="total"
        >
          <InputNumber readOnly style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add asset
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

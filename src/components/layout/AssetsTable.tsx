import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CryptoContext } from '../../context/crypto-context';
import { useContext } from 'react';

interface DataType {
  key: React.Key;
  coin: string;
  amount: number;
  price: number;
  date: Date;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Coin',
    dataIndex: 'coin',
    sorter: (a, b) => a.coin.length - b.coin.length,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    },
  },
]

export const AssetsTable = () => {
  const { assets } = useContext(CryptoContext);
  let count = 0;

  const data = assets.map((a) => {
    return a.purchases.map((p) => ({
      key: count++,
      coin: a.id,
      amount: p.amount,
      price: p.price,
      date: p.date,
    }))
  }).flat();

  return (
    <Table
      size='small'
      columns={columns}
      dataSource={data}
    />
  )
}

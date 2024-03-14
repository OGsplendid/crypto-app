import { Flex, Layout, Typography } from 'antd';
import { IAsset } from '../../models';
import { CryptoContext } from '../../context/crypto-context';
import { useContext } from 'react';
import { AssetsTable } from './AssetsTable';
import { PortfolioChart } from './PortfolioChart';

const contentStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

export const AppContent = () => {
  const { assets } = useContext(CryptoContext);

  const totalFundsSum = assets.reduce((sum: number, a: IAsset) => sum + a.totalFund, 0);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{textAlign: 'left', color: '#fff', marginBottom: '2rem'}} underline>
        {`Asset portfolio: $${totalFundsSum.toFixed(2)}`}
      </Typography.Title>
      <Flex vertical gap={60}>
        <PortfolioChart />
        <AssetsTable />
      </Flex>
    </Layout.Content>
  )
}

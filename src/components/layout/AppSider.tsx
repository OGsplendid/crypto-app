import { Layout, Card, Statistic, List, Typography, Spin, Tag, Modal } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SwapOutlined } from '@ant-design/icons';
import { capitalized } from '../../utils';
import { CryptoContext } from '../../context/crypto-context';
import { IAsset } from '../../models';
import { useContext, useState } from 'react';
import { AssetInfoModal } from '../AssetInfoModal';
// import CountUp from 'react-countup';

export const AppSider = () => {
  const { loading, assets } = useContext(CryptoContext);
  const [assetInfo, setAssetInfo] = useState<IAsset | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  if (loading) return <Spin fullscreen /> // to make different loader for each component

  // const formatter = (value: number) => <CountUp end={value} separator="," />;

  const handleOpenModal = (id: string) => {
    const asset = assets.find((c) => c.id === id);
    if (!asset) return;
    setModalOpen(true);
    setAssetInfo(asset);
  }

  return (
    <Layout.Sider width={370} style={{ padding: '1rem' }}>
      {assets.map((asset: IAsset) => (
        <Card
            key={asset.id}
            style={{ marginBottom: '1rem', cursor: 'pointer' }}
            onClick={() => handleOpenModal(asset.id)}>
          <Statistic
            title={capitalized(asset.id)}
            value={asset.totalFund}
            precision={2}
            valueStyle={{ color: asset.grow === 'asc' ? '#3f8600' : asset.grow === 'desc' ? '#cf1322' : 'orange' }}
            prefix={asset.grow === 'asc' ? <ArrowUpOutlined /> : asset.grow === 'desc' ? <ArrowDownOutlined /> : <SwapOutlined />}
            suffix="$"
          />
          {/* <Statistic title="Active Users" value={asset.purchases.reduce((sum, purchase) => sum + purchase.amount * purchase.price, 0)} formatter={formatter} /> */}
          <List
            size='small'
            dataSource={[
              {title: 'Total Profit', value: asset.totalProfit, withTag: true},
              {title: 'Asset Amount', value: asset.purchases.reduce((sum, purchase) => sum + purchase.amount, 0), isPlain: true},
              // {title: 'Difference', value: crypto.find((c) => c.id === asset.id) * asset.amount - asset.price * asset.amount},
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item?.title}</span>
                <span>
                  {item.withTag && <Tag color={asset.grow === 'asc' ? 'green' : asset.grow === 'desc' ? 'red' : 'orange'}>{asset.growPercentage} %</Tag>}
                  {item?.isPlain && item?.value.toFixed(2)}
                  {!item?.isPlain
                    && <Typography.Text type={asset.grow === 'asc' ? 'success' : asset.grow === 'desc' ? 'danger' : 'warning'}>
                          ${item?.value?.toFixed(2)}
                        </Typography.Text>}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        okButtonProps={{ disabled: true }}
        destroyOnClose >
        <AssetInfoModal asset={assetInfo} />
      </Modal>

    </Layout.Sider>
  )
}

import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useContext, useState } from 'react';
import { CryptoContext } from '../../context/crypto-context';
import { CoinInfoModal } from '../CoinInfoModal';
import { ICryptoCurrency } from '../../models';
import { AddAssetForm } from '../AddAssetForm';

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
};

export const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState<ICryptoCurrency | null>(null);
  const { crypto } = useContext(CryptoContext);

  const handleSelect = (value: string) => {
    const selectedCoin = crypto.find((c) => c.id === value);
    if (selectedCoin) setCoin(selectedCoin);
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="click to open"
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
      <Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add asset" onClose={() => setDrawer(false)}
        open={drawer}
        keyboard={true}
        destroyOnClose={true}>
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}

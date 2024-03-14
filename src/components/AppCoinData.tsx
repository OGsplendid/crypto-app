import { Flex, Typography } from "antd"
import { ICryptoCurrency } from "../models"

export const AppCoinData = ({ coin, withSymbol }: { coin: ICryptoCurrency | null, withSymbol: boolean }) => {
  return (
    <Flex align='center'>
        <img src={coin?.icon} alt={coin?.name} style={{ width: 40, marginRight: 10 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
            {withSymbol && coin?.symbol} {coin?.name}
        </Typography.Title>
    </Flex>
  )
}

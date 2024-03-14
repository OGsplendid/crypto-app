import { Divider, Typography } from "antd";
import { IAsset } from "../models"

export const AssetInfoModal = ({ asset }: {asset: IAsset | null}) => {
  if (!asset) return;
  return (
    <>
      <Typography.Title level={3}>
        {asset.id}
      </Typography.Title>

      <Divider />

      {asset.purchases.map((a) => (
        <Typography.Paragraph key={a.date.toString()}>
          <Typography.Paragraph>
            <Typography.Text strong>{`Price: ${a.price.toFixed(2)}`}</Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Text strong>{`Amount: ${a.amount}`}</Typography.Text>
          </Typography.Paragraph>
            <Typography.Paragraph>
            <Typography.Text strong>{`Date: ${a.date}`}</Typography.Text>
          </Typography.Paragraph>
          <Divider />
        </Typography.Paragraph>
      ))}
    </>
  )
}

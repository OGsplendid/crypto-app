import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext } from 'react';
import { Pie } from "react-chartjs-2";
import { CryptoContext } from '../../context/crypto-context';
import { capitalized } from '../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioChart = () => {
  const { assets } = useContext(CryptoContext);

  const data = {
    labels: assets.map((a) => capitalized(a.id)),
    datasets: [
      {
        label: 'Capitalization in USD',
        data: assets.map((a) => +a.totalFund.toFixed(2)),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      }
    ]
  }

  return (
    <div style={{ display: 'flex', marginBottom: "3rem", justifyContent: 'center', height: 400 }}>
      <Pie data={data} />
    </div>
  )
}

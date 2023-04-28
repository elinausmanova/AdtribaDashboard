import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ labels, values, title }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: title
      }
    }
  };

    const data = {
        labels: ['Paid channels', 'Organic channels'],
        datasets: [
          {
            data: values,
            backgroundColor: [
              '#091937',
              '#FFEECA',
            ],
            borderColor: [
              '#091937',
              '#FFEECA',
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    <Doughnut options={options} style={{width: '100%'}} data={data} />
  );
}
export default PieChart;
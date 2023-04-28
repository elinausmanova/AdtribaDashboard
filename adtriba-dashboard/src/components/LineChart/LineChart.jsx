import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ labels, values, title }) {

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        // label: 'Dataset 1',
        data: values,
        borderColor: '#091937',
        backgroundColor: '#091937',
      },
    ],
  }

  return (
    <Line options={options} data={data} height={'500px'} />
  )
}

export default LineChart;
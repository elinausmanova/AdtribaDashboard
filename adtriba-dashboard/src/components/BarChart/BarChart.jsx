import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ labels, values, colors, title }) {

  const options = {
    legend: {
      display: false
    },
    maintainAspectRatio: false,

    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "right"
      },
      title: {
        display: true,
        text: title
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "#091937",
        borderWidth: 0.2,
        backgroundColor: colors,
      },
    ]
  };

  return <Bar options={options} data={data} style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;
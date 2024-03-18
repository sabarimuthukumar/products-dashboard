import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartsProps } from '../types/dashboardTypes';

const Charts: React.FC<ChartsProps> = ({ productDetails, priceDetails }) => {
  const chartRef = useRef(null);
  const chartData = priceDetails && priceDetails.map((item) => item ? item.price : '')
  const categoriesData = priceDetails && priceDetails.map((item) => item ? item.product : '')
  const pieChartOptions: Highcharts.Options = {
    title: {
      text: 'Category',
    },
    series: [
      {
        type: 'pie',
        name: 'No of Products',
        data: productDetails,
      },
    ],
    accessibility: {
      enabled: false
    }
  };
  const barChartOptions: Highcharts.Options = {
    title: {
      text: "Products and Price"
    },
    series: [
      {
        type: "column",
        name: "Products",
        data: chartData,
        dataLabels: {
          enabled: true,
          inside: false,
          format: '{y}$',
          style: {
            color: 'black'
          }
        }
      }
    ],
    yAxis: {
      title: {
        text: "Price"
      }
    },
    xAxis: {
      categories: categoriesData,
      labels: {
        useHTML: true,
        formatter: function () {
          return `<div style="text-align:center">${this.value}</div>`;
        }
      }
    },
    accessibility: {
      enabled: false
    }
  };
  return (
    <div className='chartArea'>
      {(priceDetails === undefined || priceDetails.length === 0) &&
        <HighchartsReact highcharts={Highcharts} options={pieChartOptions} ref={chartRef} />
      }
      {priceDetails && priceDetails.length !== 0 &&
        <HighchartsReact highcharts={Highcharts} options={barChartOptions} ref={chartRef} />
      }
    </div>
  );
};

export default Charts;

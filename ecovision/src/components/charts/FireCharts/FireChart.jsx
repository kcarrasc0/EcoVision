import React from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './FireChart.module.css';

// Dados de exemplo (extraídos do CSV)
const barData = {
  months: [
    '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10'
  ],
  data: {
    'Vegetação Nativa': [5000, 7000, 4000, 9000, 3000, 1000],
    'Desmatamento Recente': [3000, 5000, 3500, 7000, 2000, 800],
    'Desmatamento Consolidado': [6000, 8000, 5000, 8500, 2500, 1200],
    'Outras Áreas': [200, 300, 150, 250, 100, 50]
  }
};

const pieData = [
  { name: 'Sergipe', value: 55748 },
  { name: 'Roraima', value: 46790 },
  { name: 'Alagoas', value: 25400 },
  { name: 'Pernambuco', value: 21700 },
  { name: 'Paraná', value: 19200 },
  { name: 'Outros', value: 40000 }
];

const FireChart = () => {
  const barOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: { textStyle: { color: 'white' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: barData.months,
      axisLabel: { color: 'white' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'white' }
    },
    series: Object.entries(barData.data).map(([key, values]) => ({
      name: key,
      type: 'bar',
      stack: 'total',
      emphasis: { focus: 'series' },
      data: values
    })),
    color: ['#00c853', '#ffd600', '#ff6d00', '#90a4ae']
  };

  const pieOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { color: 'white' }
    },
    series: [
      {
        name: 'Focos por Estado',
        type: 'pie',
        radius: '60%',
        data: pieData,
        label: {
          color: 'white'
        }
      }
    ],
    color: ['#ef5350', '#ab47bc', '#42a5f5', '#26a69a', '#66bb6a', '#90a4ae']
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartBox}>
        <h3>🔥 Distribuição de Focos por Mês</h3>
        <ReactECharts option={barOptions} style={{ height: 300 }} />
      </div>

      <div className={styles.chartBox}>
        <h3>📍 Focos por Estado</h3>
        <ReactECharts option={pieOptions} style={{ height: 300 }} />
      </div>
    </div>
  );
};

export default FireChart;

// ← KCARRASCO 🏹

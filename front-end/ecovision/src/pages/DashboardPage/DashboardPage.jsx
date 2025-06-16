import React from 'react';
import styles from './DashboardPage.module.css';
import Header from '../../components/layout/Header/Header';
import FireChart from '../../components/charts/FireCharts/FireChart';

const DashboardPage = () => {
  // 🔢 Dados simulados do CSV (exemplo de focos por bioma e estados)
  const focosPorBioma = [
    { label: 'Amazônia', value: 120000 },
    { label: 'Cerrado', value: 85000 },
    { label: 'Pantanal', value: 30000 },
  ];

  const porcentagemEstados = [
    { label: 'Sergipe', value: 55748 },
    { label: 'Alagoas', value: 46790 },
    { label: 'Pará', value: 23000 },
    { label: 'Pernambuco', value: 20000 },
    { label: 'Bahia', value: 18000 },
  ];

  return (
    <div>
      <Header />

      <main className={styles.dashboard}>
        {/* Gráfico de Barras: Focos por Bioma */}
        <section className={styles.chartCard}>
          <h2>Focos por Bioma</h2>
          <FireChart
            type="bar"
            data={focosPorBioma}
            config={{
              series: {
                itemStyle: {
                  color: '#4f46e5'
                }
              }
            }}
          />
        </section>

        {/* Gráfico de Pizza: Porcentagem por Estado */}
        <section className={styles.chartCard}>
          <h2>Distribuição por Estado</h2>
          <FireChart
            type="pie"
            data={porcentagemEstados}
            config={{
              series: {
                radius: ['40%', '70%'],
                label: {
                  formatter: '{b}: {d}%',
                  color: '#000',
                },
              },
            }}
          />
        </section>
        <FireChart />
      </main>
    </div>
  );
};

export default DashboardPage;
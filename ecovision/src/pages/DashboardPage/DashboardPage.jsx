import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.css';
import Header from '../../components/layout/Header/Header';
import FireChart from '../../components/charts/FireCharts/FireChart';

const API_BASE_URL = 'http://localhost:3001/api/dashboard';

const DashboardPage = () => {
  const [focosPorBioma, setFocosPorBioma] = useState([]);
  const [distPorEstado, setDistPorEstado] = useState([]);
  const [biomasOptions, setBiomasOptions] = useState([]);
  const [estadosOptions, setEstadosOptions] = useState([]);
  
  // --- CORREÇÃO IMPORTANTE AQUI ---
  // O valor padrão do filtro deve ser "todos", em minúsculas, para corresponder ao backend.
  const [selectedBiome, setSelectedBiome] = useState('todos');
  const [selectedState, setSelectedState] = useState('todos');
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/filtros`)
      .then(res => res.json())
      .then(data => {
        // Adiciona a opção "Todos" no início dos arrays recebidos da API
        setBiomasOptions(['Todos', ...data.biomas]);
        setEstadosOptions(['Todos', ...data.estados]);
      })
      .catch(error => console.error("Erro ao buscar opções de filtros:", error));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      bioma: selectedBiome,
      estado: selectedState,
    });
    
    fetch(`${API_BASE_URL}/focos?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setFocosPorBioma(data.focos_por_bioma);
        setDistPorEstado(data.distribuicao_por_estado);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar dados dos focos:", error);
        setIsLoading(false);
      });
  }, [selectedBiome, selectedState]);

  const handleDownload = () => {
    const params = new URLSearchParams({
      bioma: selectedBiome,
      estado: selectedState,
    });
    window.open(`${API_BASE_URL}/focos/download?${params.toString()}`, '_blank');
  };

  return (
    <div>
      <Header />
      <main className={styles.dashboard}>
        <section className={styles.controlsContainer}>
          <div className={styles.filterItem}>
            <label htmlFor="biome-select">Filtrar por Bioma</label>
            {/* --- CORREÇÃO IMPORTANTE AQUI --- */}
            {/* O valor do <option> agora é o próprio nome do bioma (ex: "Amazônia"), e o onChange envia em minúsculas */}
            <select 
              id="biome-select" 
              value={selectedBiome} 
              onChange={e => setSelectedBiome(e.target.value)}
            >
              {biomasOptions.map(b => (
                <option key={b} value={b.toLowerCase()}>{b}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterItem}>
            <label htmlFor="state-select">Filtrar por Estado</label>
            {/* --- CORREÇÃO IMPORTANTE AQUI --- */}
            {/* Mesma lógica para o filtro de estado */}
            <select 
              id="state-select" 
              value={selectedState} 
              onChange={e => setSelectedState(e.target.value)}
            >
              {estadosOptions.map(e => (
                <option key={e} value={e.toLowerCase()}>{e}</option>
              ))}
            </select>
          </div>
          <button onClick={handleDownload} className={styles.downloadButton}>
            Baixar CSV
          </button>
        </section>

        {isLoading ? (
          <div className={styles.loading}>Carregando dados...</div>
        ) : (
          <>
            <section className={styles.chartCard}>
              <FireChart
                chartType="bar"
                data={focosPorBioma}
                title="Focos por Bioma"
              />
            </section>
            <section className={styles.chartCard}>
              <FireChart
                chartType="pie"
                data={distPorEstado}
                title="Distribuição por Estado"
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
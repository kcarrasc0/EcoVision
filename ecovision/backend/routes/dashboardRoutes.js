const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const dataFolderPath = path.join(__dirname, '../data');

let focosData = [];
let dataPromise = null;

const biomaMapping = {
    'amazonia.csv': 'Amazônia',
    'mata_atlantica.csv': 'Mata Atlântica',
    'caatinga.csv': 'Caatinga',
    'cerrado.csv': 'Cerrado',
    'pantanal.csv': 'Pantanal',
    'pampa.csv': 'Pampa'
};

const loadCsvData = () => {
  if (dataPromise) return dataPromise;

  dataPromise = new Promise(async (resolve, reject) => {
    try {
      const files = await fs.promises.readdir(dataFolderPath);
      const allData = [];
      
      // --- AJUSTE DEFINITIVO AQUI ---
      // Baseado na sua imagem, estes são os nomes de coluna corretos que vamos FORÇAR.
      const csvHeaders = [
          'datahora', 'satelite', 'pais', 'estado', 'municipio', 'bioma_original', // renomeamos a coluna de bioma original para não conflitar
          'diasemchuva', 'precipitacao', 'riscofogo', 'latitude', 'longitude', 'frp'
      ];

      await Promise.all(files.map(file => {
        return new Promise((resolveFile, rejectFile) => {
          const biomaName = biomaMapping[file.toLowerCase()]; 
          if (!biomaName) return resolveFile();

          const filePath = path.join(dataFolderPath, file);
          const fileData = [];

          fs.createReadStream(filePath)
            // Usamos as opções 'headers' e 'skipLines' para ignorar o cabeçalho do arquivo
            // e usar o nosso, que é garantido.
            .pipe(csvParser({ 
                separator: ';',
                headers: csvHeaders,
                skipLines: 1 
            }))
            .on('data', (row) => {
              // Agora, 'row' terá as chaves que definimos em csvHeaders.
              // A chave 'row.estado' está garantida.
              
              // Adicionamos nosso bioma correto.
              row.bioma = biomaName;
              fileData.push(row);
            })
            .on('end', () => {
              allData.push(...fileData);
              resolveFile();
            })
            .on('error', rejectFile);
        });
      }));

      focosData = allData;
      console.log(`[SOLUÇÃO DEFINITIVA] Todos os arquivos carregados e mapeados com sucesso. Total de ${focosData.length} registros.`);
      resolve();
    } catch (error) {
      console.error("Erro ao carregar os arquivos CSV:", error);
      reject(error);
    }
  });

  return dataPromise;
};

loadCsvData();

// O resto do arquivo não precisa de nenhuma alteração.
// As rotas agora receberão dados com a estrutura correta e consistente.

router.get('/filtros', async (req, res) => {
    try {
      await dataPromise;
      const estados = [...new Set(focosData.map(item => item.estado))].filter(Boolean).sort();
      const biomas = [...new Set(focosData.map(item => item.bioma))].filter(Boolean).sort();
      res.json({ biomas, estados });
    } catch (error) {
      res.status(500).json({ error: 'Falha ao carregar dados para os filtros.' });
    }
});

router.get('/focos', async (req, res) => {
    try {
      await dataPromise;
      const { bioma, estado } = req.query;
      const filteredData = focosData.filter(item => {
        const biomaMatch = (bioma === 'todos' || !bioma) || (item.bioma && item.bioma.toLowerCase() === bioma.toLowerCase());
        const estadoMatch = (estado === 'todos' || !estado) || (item.estado && item.estado.toLowerCase() === estado.toLowerCase());
        return biomaMatch && estadoMatch;
      });
      const aggregate = (data, key) => {
        const counts = data.reduce((acc, item) => {
          const itemKey = item[key];
          if (itemKey) { acc[itemKey] = (acc[itemKey] || 0) + 1; }
          return acc;
        }, {});
        return Object.entries(counts).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
      };
      const focosPorBioma = aggregate(filteredData, 'bioma');
      const distribuicaoPorEstado = aggregate(filteredData, 'estado');
      res.json({ focos_por_bioma: focosPorBioma, distribuicao_por_estado: distribuicaoPorEstado });
    } catch (error) {
      res.status(500).json({ error: 'Falha ao processar dados dos focos.' });
    }
});

router.get('/focos/download', async (req, res) => {
    try {
      await dataPromise;
      const { bioma, estado } = req.query;
      const filteredData = focosData.filter(item => {
          const biomaMatch = (bioma === 'todos' || !bioma) || (item.bioma && item.bioma.toLowerCase() === bioma.toLowerCase());
          const estadoMatch = (estado === 'todos' || !estado) || (item.estado && item.estado.toLowerCase() === estado.toLowerCase());
          return biomaMatch && estadoMatch;
      });
      if (filteredData.length === 0) {
        return res.status(404).send('Nenhum dado encontrado para os filtros selecionados.');
      }
      // Limpa a coluna 'bioma_original' antes de exportar
      const dataToExport = filteredData.map(item => {
          const { bioma_original, ...rest } = item;
          return rest;
      });
      const headers = Object.keys(dataToExport[0]);
      const csvRows = [
          headers.join(';'),
          ...dataToExport.map(row => headers.map(header => `${row[header] !== null && row[header] !== undefined ? row[header] : ''}`).join(';'))
      ];
      const csvString = csvRows.join('\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=dados_filtrados_ecovision.csv');
      res.status(200).end(csvString);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao gerar o arquivo CSV.' });
    }
});

module.exports = router;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Exporta um array de objetos para um arquivo Excel (.xlsx)
 * @param {Array} data - Dados a serem exportados
 * @param {string} filename - Nome do arquivo para salvar
 */
export const exportToExcel = (data, filename = 'relatorio-di2win.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  });

  saveAs(blob, filename);
};



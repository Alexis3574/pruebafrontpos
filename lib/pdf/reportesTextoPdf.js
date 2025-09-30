// /lib/pdf/reportesTextoPdf.js
import jsPDF from "jspdf";
import dayjs from "dayjs";

export function generarPDFReporteLibre({ titulo = "Reporte", tipo, contenido, autor = "Administrador", marcaNoOficial = true }) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 50;
  let cursorY = 60;

  // Encabezado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(titulo, marginX, cursorY);
  cursorY += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const fecha = dayjs().format("YYYY-MM-DD HH:mm");
  if (tipo) { doc.text(`Tipo: ${tipo}`, marginX, cursorY); cursorY += 14; }
  doc.text(`Generado: ${fecha}`, marginX, cursorY); cursorY += 14;
  doc.text(`Autor: ${autor}`, marginX, cursorY); cursorY += 18;

  // Contenido
  doc.setFontSize(11);
  const ancho = doc.internal.pageSize.getWidth() - marginX * 2;
  const lines = doc.splitTextToSize(contenido || "", ancho);
  doc.text(lines, marginX, cursorY);

  // Marca de agua "NO OFICIAL"
  if (marcaNoOficial) {
    const centerX = doc.internal.pageSize.getWidth() / 2;
    const centerY = doc.internal.pageSize.getHeight() / 2;
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(60);
    doc.setFont("helvetica", "bold");
    doc.text("NO OFICIAL", centerX, centerY, { angle: 30, align: "center" });
    doc.setTextColor(0, 0, 0);
  }

  // Pie de página
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.text(`Página ${i} de ${pageCount}`, marginX, doc.internal.pageSize.getHeight() - 20);
  }
  return doc;
}

'use client';
import jsPDF from 'jspdf';

export default function PrintFactura({ factura }) {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Factura", 20, 20);

    doc.setFontSize(12);
    doc.text(`Folio: ${factura.folio}`, 20, 40);
    doc.text(`Fecha: ${new Date(factura.fecha).toLocaleDateString()}`, 20, 50);
    doc.text(`Total: $${factura.total}`, 20, 60);
    doc.text(`Venta ID: ${factura.ventaid}`, 20, 70);

    doc.save(`factura_${factura.folio || factura.id}.pdf`);
  };

  return (
    <button
      onClick={handleExportPDF}
      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
    >
      Exportar PDF
    </button>
  );
}

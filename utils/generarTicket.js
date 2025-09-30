import { jsPDF } from 'jspdf';

/**
  @param {Object} opts
  @param {Array}  opts.detalles 
  @param {Number} opts.total   
  @param {Object} opts.negocio  
  @param {String} opts.folio  
  @param {Number} opts.efectivo 
 */
export function generarTicketPDF({
  detalles = [],
  total = 0,
  negocio = {},
  folio,
  efectivo,
}) {
  const doc = new jsPDF({ unit: 'mm', format: [80, 200] });
  let y = 8;

  const line = (txt, x = 4) => {
    doc.text(String(txt), x, y);
    y += 5;
  };

  doc.setFontSize(12);
  line(negocio.nombre || 'Mi Negocio');
  doc.setFontSize(8);
  if (negocio.rfc) line(`RFC: ${negocio.rfc}`);
  if (negocio.dir) line(negocio.dir);
  line(`Fecha: ${new Date().toLocaleString()}`);
  if (folio) line(`Folio: ${folio}`);

  y += 2;
  doc.line(2, y, 78, y);
  y += 4;

  doc.setFont(undefined, 'bold');
  doc.text('Cant', 4, y);
  doc.text('Desc', 14, y);
  doc.text('Importe', 78 - 2, y, { align: 'right' });
  doc.setFont(undefined, 'normal');
  y += 4;

  
  detalles.forEach((d) => {
    const cant = parseInt(d.cantidad) || 0;
    const nombre =
      d.producto?.nombre ||
      d.productos?.nombre ||
      d.nombre ||
      `#${d.productoid ?? d.productoId ?? ''}`;
    const precio = parseFloat(d.preciounitario) || 0;
    const importe = cant * precio;

    doc.text(String(cant), 4, y);

    const descLines = doc.splitTextToSize(nombre, 42);
    doc.text(descLines, 14, y);

    doc.text(importe.toFixed(2), 78 - 2, y, { align: 'right' });

    y += 4 + (descLines.length - 1) * 4;
  });

  y += 1;
  doc.line(2, y, 78, y);
  y += 4;

  doc.setFont(undefined, 'bold');
  doc.text('TOTAL:', 40, y);
  doc.text(Number(total).toFixed(2), 78 - 2, y, { align: 'right' });
  doc.setFont(undefined, 'normal');
  y += 6;

  if (efectivo != null) {
    const cambio = Number(efectivo) - Number(total);
    doc.text(`Efectivo: ${Number(efectivo).toFixed(2)}`, 4, y); y += 5;
    doc.text(`Cambio:   ${Number(cambio).toFixed(2)}`, 4, y);   y += 5;
  }

  y += 2;
  doc.text('¡Gracias por su compra!', 18, y);

  const pageHeight = y + 10;
  doc.internal.pageSize.setHeight(pageHeight);

  doc.save(`ticket_${folio || Date.now()}.pdf`);
}

'use client';

export default function PrintFactura({ factura }) {
  const handlePrint = () => {
    const content = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="text-align:center;">Factura</h2>
        <p><strong>Cliente:</strong> ${factura.cliente}</p>
        <p><strong>Productos:</strong> ${factura.productos}</p>
        <p><strong>Total:</strong> $${factura.total.toFixed(2)}</p>
        <p><strong>Fecha:</strong> ${new Date(factura.fecha).toLocaleDateString()}</p>
        <hr />
        <p style="text-align:center;">Gracias por su compra</p>
      </div>
    `;

    const printWindow = window.open('', '_blank', 'width=600,height=600');
    printWindow.document.write(`<html><head><title>Factura</title></head><body>${content}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button onClick={handlePrint} className="text-indigo-600 hover:underline">Imprimir</button>
  );
}

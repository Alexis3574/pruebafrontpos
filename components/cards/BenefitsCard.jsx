'use client';

export default function BenefitsCard() {
    return (
      <div className="bg-emerald-100   shadow-md p-6 rounded-xl max-w-3xl w-full">
        <h3 className="text-xl text-black font-semibold mb-4">Beneficios del sistema</h3>
        <ul className="list-disc list-inside space-y-2 text-black">
          <li>✓ Control de caducidad automático</li>
          <li>✓ Reportes rápidos y visuales</li>
          <li>✓ Gestión de inventario simple</li>
          <li>✓ Ahorra tiempo y reduce pérdidas</li>
        </ul>
      </div>
    );
  }
  
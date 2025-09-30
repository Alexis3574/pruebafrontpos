'use client';
import { useState, useEffect } from 'react';

export default function Form({ configuracion, onSave }) {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    const initialState = {
      nombre_negocio: '',
      rfc_negocio: '',
      direccion_negocio: '',
      telefono_negocio: '',
      impuesto_iva: '',
      moneda: '',
      mostrar_stock_bajo: '',
      stock_minimo_default: '',
      caducidad_activa: '',
      tipo_factura_default: '',
    };

    configuracion.forEach(item => {
      if (item.clave in initialState) {
        initialState[item.clave] = item.valor;
      }
    });

    setFormState(initialState);
  }, [configuracion]);

  const handleChange = (clave, valor) => {
    setFormState(prev => ({ ...prev, [clave]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(formState).forEach(([clave, valor]) => {
      onSave(clave, valor);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow text-black">
      {Object.entries(formState).map(([clave, valor]) => (
        <div key={clave}>
          <label className="block text-sm font-medium text-gray-700 capitalize mb-1">{clave.replaceAll('_', ' ')}</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={valor}
            onChange={(e) => handleChange(clave, e.target.value)}
          />
        </div>
      ))}
      <button type="submit" className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-600">
        Guardar Configuración
      </button>
    </form>
  );
}

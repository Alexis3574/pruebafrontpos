'use client';
import { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import { useFacturas } from '../../hooks/useFacturacion';

export default function FacturacionPage() {
  const { facturas, crearFactura, obtenerFacturas } = useFacturas();

  useEffect(() => {
    obtenerFacturas();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Facturación</h1>
      <Form onSave={crearFactura} />
      <List facturas={facturas} />
    </div>
  );
}

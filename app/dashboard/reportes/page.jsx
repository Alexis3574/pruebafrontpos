'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const categorias = ['Animal', 'Vegetal', 'Derivado'];
const colores = ['#8884d8', '#82ca9d', '#ffc658'];

const datosVentas = [
  { nombre: 'Leche', categoria: 'Animal', ventas: 120 },
  { nombre: 'Tomate', categoria: 'Vegetal', ventas: 80 },
  { nombre: 'Yogurt', categoria: 'Derivado', ventas: 90 },
  { nombre: 'Queso', categoria: 'Derivado', ventas: 70 },
  { nombre: 'Carne', categoria: 'Animal', ventas: 100 },
];

const evolucionVentas = [
  { fecha: '01/04', total: 50 },
  { fecha: '02/04', total: 80 },
  { fecha: '03/04', total: 60 },
  { fecha: '04/04', total: 90 },
  { fecha: '05/04', total: 70 },
];

export default function Reportes() {
  const router = useRouter();
  const [filtro, setFiltro] = useState('mes');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') router.push('/login');
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Ventas', 10, 10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 10, 20);
    doc.save('reporte.pdf');
  };

  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(datosVentas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Ventas');
    XLSX.writeFile(libro, 'reporte.xlsx');
  };

  const datosPorCategoria = categorias.map((cat) => ({
    categoria: cat,
    ventas: datosVentas
      .filter((d) => d.categoria === cat)
      .reduce((sum, d) => sum + d.ventas, 0),
  }));

  return (
    <>
      <Head>
        <title>Reportes | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">

        <main className="flex-grow px-6 py-8 bg-gray-100 text-black">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Reportes</h1>

            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="dia">Hoy</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Ventas por Producto</h2>
              <BarChart width={400} height={250} data={datosVentas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#8884d8" />
              </BarChart>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Ventas por Categoría</h2>
              <PieChart width={400} height={250}>
                <Pie
                  data={datosPorCategoria}
                  dataKey="ventas"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {datosPorCategoria.map((_, index) => (
                    <Cell key={index} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Evolución de Ventas</h2>
            <LineChart width={600} height={250} data={evolucionVentas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </div>

          <div className="flex gap-4">
            <button
              onClick={exportarPDF}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Exportar a PDF
            </button>
            <button
              onClick={exportarExcel}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Exportar a Excel
            </button>
          </div>
        </main>

      </div>
    </>
  );
}

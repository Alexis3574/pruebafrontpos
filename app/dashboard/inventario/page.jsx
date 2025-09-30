'use client';
import { useEffect, useMemo, useState } from 'react';
import Form from './Form';
import List from './List';
import { useMovimientosInventario } from '../../hooks/useMovimientosInventario';

export default function InventarioPage() {
  const {
    movimientos, 
    crear,
    actualizar,
    obtener,
    eliminar,
  } = useMovimientosInventario();

  const [itemEditar, setItemEditar] = useState(null);

  useEffect(() => {
    obtener();
  }, []);

  const handleSave = async (data) => {
    if (itemEditar) {
      await actualizar(itemEditar.id, data);
      setItemEditar(null);
    } else {
      await crear(data);
    }
    obtener();
  };

  const handleDelete = async (id) => {
    const confirmar = confirm('¿Estás seguro de eliminar este registro?');
    if (confirmar) {
      await eliminar(id);
      obtener();
    }
  };

  const kpis = useMemo(() => {
    const list = movimientos || [];
    const entradas = list
      .filter(m => (m?.tipo || '').toLowerCase() === 'entrada')
      .reduce((acc, m) => acc + (parseInt(m.cantidad) || 0), 0);
    const salidas = list
      .filter(m => (m?.tipo || '').toLowerCase() === 'salida')
      .reduce((acc, m) => acc + (parseInt(m.cantidad) || 0), 0);
    const ajustes = list
      .filter(m => (m?.tipo || '').toLowerCase() === 'ajuste')
      .reduce((acc, m) => acc + (parseInt(m.cantidad) || 0), 0);
    const totalReg = list.length;
    const balance = entradas - salidas;

    return { entradas, salidas, ajustes, totalReg, balance };
  }, [movimientos]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-200/60 via-sky-200/60 to-violet-200/60 blur-3xl" />

      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <header className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Gestión de Inventario</h1>
              <p className="mt-1 text-slate-600">
                Registra entradas, salidas y ajustes de stock.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => obtener()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50"
                title="Actualizar listado"
              >
                <RefreshIcon className="h-4 w-4" />
                Actualizar
              </button>

              {itemEditar && (
                <button
                  type="button"
                  onClick={() => setItemEditar(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                >
                  <CancelIcon className="h-4 w-4" />
                  Cancelar edición
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Chip className="border-slate-200 bg-white text-slate-700">
              <Dot className="h-3 w-3" />
              Movimientos: <strong className="ml-1">{kpis.totalReg}</strong>
            </Chip>

            <Chip className="border-emerald-200 bg-emerald-50 text-emerald-700">
              <Dot className="h-3 w-3" />
              Entradas: <strong className="ml-1">{kpis.entradas}</strong>
            </Chip>

            <Chip className="border-red-200 bg-red-50 text-red-700">
              <Dot className="h-3 w-3" />
              Salidas: <strong className="ml-1">{kpis.salidas}</strong>
            </Chip>

            <Chip className="border-amber-200 bg-amber-50 text-amber-700">
              <Dot className="h-3 w-3" />
              Ajustes: <strong className="ml-1">{kpis.ajustes}</strong>
            </Chip>

            <Chip
              className={`${
                kpis.balance >= 0
                  ? 'border-sky-200 bg-sky-50 text-sky-700'
                  : 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700'
              }`}
              title="Entradas - Salidas"
            >
              <Dot className="h-3 w-3" />
              Balance: <strong className="ml-1">{kpis.balance}</strong>
            </Chip>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <Form itemEditar={itemEditar} onSave={handleSave} />
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <List inventario={movimientos} onEdit={setItemEditar} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

function Chip({ children, className = '', title }) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${className}`}
    >
      {children}
    </span>
  );
}

function RefreshIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}
function CancelIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function Dot(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="currentColor">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}

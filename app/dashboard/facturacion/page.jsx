'use client';

import Form from './Form';
import List from './List';

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-200/60 via-sky-200/60 to-violet-200/60 blur-3xl" />

      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Facturación</h1>
          <p className="mt-1 text-slate-600">
            Genera, guarda y exporta facturas en PDF.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
            <Form />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
            <List />
          </section>
        </div>
      </main>
    </div>
  );
}

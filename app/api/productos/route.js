import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: obtener productos
export async function GET() {
const productos = await prisma.productos.findMany();
  return NextResponse.json(productos);
}

// POST: crear un producto
export async function POST(request) {
  const body = await request.json();

  let fechaCaducidad = null;
  if (body.fecha_caducidad && !isNaN(Date.parse(body.fecha_caducidad))) {
    fechaCaducidad = new Date(body.fecha_caducidad);
  }

  const nuevoProducto = await prisma.productos.create({
    data: {
      nombre: body.nombre,
      tipo: body.tipo,
      precio_compra: body.precio_compra,
      precio_venta: body.precio_venta,
      stock: body.stock,
      stock_minimo: body.stock_minimo ?? 5,
      fecha_caducidad: fechaCaducidad,
    },
  });

  return NextResponse.json(nuevoProducto);
}

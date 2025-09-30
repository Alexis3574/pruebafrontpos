import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const productos = await prisma.productos.findMany({
      orderBy: { creadoen: 'desc' },
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error('❌ Error en GET /api/productos:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const fechaCad = body.fechacaducidad
      ? new Date(body.fechacaducidad)
      : null;

    const nuevoProducto = await prisma.productos.create({
      data: {
        nombre: body.nombre,
        tipo: body.tipo,
        preciocompra: body.preciocompra ?? 0,
        precioventa: body.precioventa,
        stock: body.stock,
        stockminimo: body.stockminimo ?? 5,
        unidadMedida: body.unidadMedida,
        fechacaducidad: fechaCad,
      },
    });

    return NextResponse.json(nuevoProducto);
  } catch (error) {
    console.error('❌ Error en POST /api/productos:', error);
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}

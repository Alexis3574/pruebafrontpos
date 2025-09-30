import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const movimientos = await prisma.movimientosinventario.findMany({
      include: {
        productos: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });

    return NextResponse.json(movimientos);
  } catch (error) {
    console.error('❌ Error en GET /api/movimientosinventario:', error);
    return NextResponse.json({ error: 'Error al obtener los movimientos' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { productoid, tipo, cantidad, observacion } = await req.json();

    if (!productoid || !tipo || isNaN(cantidad)) {
      return NextResponse.json({ error: 'Datos incompletos o inválidos' }, { status: 400 });
    }

    const nuevo = await prisma.movimientosinventario.create({
      data: {
        productoid,
        tipo,
        cantidad,
        observacion,
      },
    });

    return NextResponse.json(nuevo);
  } catch (error) {
    console.error('❌ Error en POST /api/movimientosinventario:', error);
    return NextResponse.json({ error: 'Error al registrar movimiento' }, { status: 500 });
  }
}

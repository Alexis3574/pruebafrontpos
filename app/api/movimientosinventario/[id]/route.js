import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const { productoid, tipo, cantidad, observacion } = await request.json();

    const movimiento = await prisma.movimientosinventario.findUnique({
      where: { id },
    });

    if (!movimiento) {
      return NextResponse.json({ error: 'Movimiento no encontrado' }, { status: 404 });
    }

    const actualizado = await prisma.movimientosinventario.update({
      where: { id },
      data: {
        productoid,
        tipo,
        cantidad,
        observacion,
      },
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar movimiento:', error);
    return NextResponse.json({ error: 'Error al actualizar movimiento' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const movimiento = await prisma.movimientosinventario.findUnique({
      where: { id },
    });

    if (!movimiento) {
      return NextResponse.json({ error: 'Movimiento no encontrado' }, { status: 404 });
    }

    await prisma.movimientosinventario.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Movimiento eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar movimiento:', error);
    return NextResponse.json({ error: 'Error al eliminar movimiento' }, { status: 500 });
  }
}

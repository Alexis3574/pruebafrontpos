import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - obtener una venta por ID
export async function GET(request, { params }) {
  const id = parseInt(params.id);
  if (!id || isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    const venta = await prisma.ventas.findUnique({
      where: { id },
      include: {
        detalleventas: {
          include: {
            productos: true,
          },
        },
        facturas: true,
        usuarios: true,
      },
    });

    if (!venta) {
      return NextResponse.json({ message: 'Venta no encontrada' }, { status: 404 });
    }

    return NextResponse.json(venta);
  } catch (error) {
    console.error('❌ Error en GET /api/ventas/[id]:', error);
    return NextResponse.json({ message: 'Error al obtener la venta', detail: error.message }, { status: 500 });
  }
}

// PUT - actualizar una venta
export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const body = await request.json();

  if (!id || isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    const ventaActualizada = await prisma.ventas.update({
      where: { id },
      data: {
        total: body.total ?? undefined,
        metodopago: body.metodopago ?? undefined,
        fecha: body.fecha ? new Date(body.fecha) : undefined,
      },
    });

    return NextResponse.json(ventaActualizada);
  } catch (error) {
    console.error('❌ Error en PUT /api/ventas/[id]:', error);
    return NextResponse.json({ message: 'Error al actualizar la venta', detail: error.message }, { status: 500 });
  }
}

// DELETE - eliminar una venta
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  if (!id || isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    await prisma.ventas.delete({ where: { id } });
    return NextResponse.json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
    console.error('❌ Error en DELETE /api/ventas/[id]:', error);
    return NextResponse.json({ message: 'Error al eliminar la venta', detail: error.message }, { status: 500 });
  }
}

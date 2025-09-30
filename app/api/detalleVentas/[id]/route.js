import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    const detalle = await prisma.detalleventas.findUnique({
      where: { id },
      include: {
        productos: true,
        ventas: true,
      },
    });

    if (!detalle) {
      return NextResponse.json({ message: 'No encontrado' }, { status: 404 });
    }

    return NextResponse.json(detalle);
  } catch (error) {
    console.error('❌ Error en GET /api/detalleventas/[id]:', error);
    return NextResponse.json({ message: 'Error al obtener detalleventa', detail: error.message }, { status: 500 });
  }
}

// PUT - Actualizar un detalle de venta
export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    const body = await request.json();
    console.log('🛠 Datos recibidos:', body);

    const productoid = parseInt(body.productoid);
    const cantidad = parseInt(body.cantidad);
    const preciounitario = parseFloat(body.preciounitario);

    if (
      isNaN(productoid) ||
      isNaN(cantidad) ||
      isNaN(preciounitario)
    ) {
      console.warn('❗️Valores inválidos en PUT detalleventa', {
        productoid,
        cantidad,
        preciounitario,
      });

      return NextResponse.json({ message: 'Datos inválidos o incompletos' }, { status: 400 });
    }

    const actualizado = await prisma.detalleventas.update({
      where: { id },
      data: {
        productoid,
        cantidad,
        preciounitario,
      },
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('❌ Error en PUT /api/detalleventas/[id]:', error);
    return NextResponse.json({
      message: 'Error al actualizar detalleventa',
      detail: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  try {
    await prisma.detalleventas.delete({ where: { id } });
    return NextResponse.json({ message: 'Detalle eliminado con éxito' });
  } catch (error) {
    console.error('❌ Error en DELETE /api/detalleventas/[id]:', error);
    return NextResponse.json({ message: 'Error al eliminar detalle', detail: error.message }, { status: 500 });
  }
}

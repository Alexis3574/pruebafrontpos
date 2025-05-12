import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - actualizar detalle_venta
export async function PUT(request) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop());
  const body = await request.json();

  if (!id || isNaN(id)) {
    return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
  }

  const { venta_id, producto_id, cantidad, precio_unitario } = body;

  // Validaciones básicas
  if (
    !venta_id ||
    !producto_id ||
    typeof cantidad !== 'number' ||
    typeof precio_unitario !== 'number'
  ) {
    return NextResponse.json(
      { message: 'Faltan o son inválidos los campos requeridos' },
      { status: 400 }
    );
  }

  // Validación de claves foráneas
  const ventaExiste = await prisma.ventas.findUnique({ where: { id: venta_id } });
  const productoExiste = await prisma.productos.findUnique({ where: { id: producto_id } });

  if (!ventaExiste || !productoExiste) {
    return NextResponse.json(
      { message: 'La venta o el producto especificado no existe' },
      { status: 400 }
    );
  }

  try {
    const actualizado = await prisma.detalle_ventas.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar detalle_venta:', error);
    return NextResponse.json(
      { message: 'Error al actualizar detalle_venta', details: error.message },
      { status: 400 }
    );
  }
}

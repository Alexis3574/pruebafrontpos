import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const productoExistente = await prisma.productos.findUnique({
      where: { id },
    });

    if (!productoExistente) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const fechaCaducidad = body.fechacaducidad
      ? new Date(body.fechacaducidad)
      : null;

    const productoActualizado = await prisma.productos.update({
      where: { id },
      data: {
        nombre: body.nombre,
        tipo: body.tipo,
        preciocompra: body.preciocompra ?? 0,
        precioventa: body.precioventa,
        stock: body.stock,
        stockminimo: body.stockminimo ?? 5,
        unidadMedida: body.unidadMedida,
        fechacaducidad: fechaCaducidad,
      },
    });

    return NextResponse.json(productoActualizado);
  } catch (error) {
    console.error('❌ Error en PUT /api/productos/[id]:', error);
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const productoExistente = await prisma.productos.findUnique({
      where: { id },
    });

    if (!productoExistente) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    await prisma.productos.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error en DELETE /api/productos/[id]:', error);
    return NextResponse.json(
      { error: 'Error al eliminar producto', detail: error.message },
      { status: 500 }
    );
  }
}

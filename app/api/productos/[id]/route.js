import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // o donde tengas tu instancia

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    const productoActualizado = await prisma.productos.update({
      where: { id: parseInt(id) },
      data: {
        nombre: body.nombre,
        tipo: body.categoria, // asegúrate de que el campo coincida
        precio_venta: body.precio,
        stock: body.stock,
      },
    });

    return NextResponse.json(productoActualizado);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  try {
    await prisma.productos.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}
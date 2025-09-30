import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const existente = await prisma.proveedores.findUnique({ where: { id } });
    if (!existente) {
      return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });
    }

    const actualizado = await prisma.proveedores.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar proveedor:', error);
    return NextResponse.json({ error: 'Error al actualizar proveedor' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    const proveedor = await prisma.proveedores.findUnique({ where: { id } });
    if (!proveedor) {
      return NextResponse.json({ error: 'Proveedor no encontrado' }, { status: 404 });
    }

    await prisma.proveedores.delete({ where: { id } });
    return NextResponse.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar proveedor:', error);
    return NextResponse.json({ error: 'Error al eliminar proveedor' }, { status: 500 });
  }
}

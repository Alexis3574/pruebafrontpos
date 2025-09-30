import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const id = parseInt(params.id);

    const actualizada = await prisma.configuracion.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(actualizada);
  } catch (error) {
    console.error('❌ Error al actualizar configuración:', error);
    return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);

    const eliminada = await prisma.configuracion.delete({
      where: { id },
    });

    return NextResponse.json(eliminada);
  } catch (error) {
    console.error('❌ Error al eliminar configuración:', error);
    return NextResponse.json({ error: 'Error al eliminar configuración' }, { status: 500 });
  }
}

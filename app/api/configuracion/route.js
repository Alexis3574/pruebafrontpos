import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const body = await req.json();

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
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const eliminada = await prisma.configuracion.delete({
      where: { id },
    });

    return NextResponse.json(eliminada);
  } catch (error) {
    console.error('❌ Error al eliminar configuración:', error);
    return NextResponse.json({ error: 'Error al eliminar configuración' }, { status: 500 });
  }
}

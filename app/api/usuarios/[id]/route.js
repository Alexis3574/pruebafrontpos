import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.rol !== 'administrador') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await req.json();
    const data = {};

    if (body.nombre?.trim()) data.nombre = body.nombre.trim();
    if (body.usuario?.trim()) data.usuario = body.usuario.trim();

    if (body.rol && ['usuario', 'administrador'].includes(body.rol)) {
      data.rol = body.rol;
    }

    if (body.password && body.password.length > 0) {
      data.password = await bcrypt.hash(body.password, 10);
    }

    const actualizado = await prisma.usuarios.update({
      where: { id },
      data,
      select: {
        id: true,
        nombre: true,
        usuario: true,
        rol: true,
      },
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    return NextResponse.json({ error: 'Error al actualizar usuario', detail: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.rol !== 'administrador') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await prisma.usuarios.delete({ where: { id } });

    return NextResponse.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error);
    return NextResponse.json({ error: 'Error al eliminar usuario', detail: error.message }, { status: 500 });
  }
}

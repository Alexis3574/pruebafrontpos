import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET(req) {
  const token = await getToken({ req });
  if (!token || !token.sub) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id: parseInt(token.sub) },
      select: {
        id: true,
        nombre: true,
        usuario: true,
        rol: true,
      },
    });

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error('❌ Error al obtener perfil:', error);
    return NextResponse.json({ error: 'Error al obtener perfil' }, { status: 500 });
  }
}

export async function PUT(req) {
  const token = await getToken({ req });
  if (!token || !token.sub) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const userId = parseInt(token.sub);
  const body = await req.json();

  const data = {
    nombre: body.nombre,
    usuario: body.usuario,
  };

  if (body.password && body.password.length > 0) {
    data.password = await bcrypt.hash(body.password, 10);
  }

  try {
    const actualizado = await prisma.usuarios.update({
      where: { id: userId },
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
    console.error('❌ Error al actualizar perfil:', error);
    return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const token = await getToken({ req });
  if (!token || !token.sub) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const userId = parseInt(token.sub);

  try {
    await prisma.usuarios.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'Cuenta eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar cuenta:', error);
    return NextResponse.json({ error: 'Error al eliminar cuenta' }, { status: 500 });
  }
}

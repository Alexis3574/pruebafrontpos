import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.rol !== 'administrador') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { nombre, password, usuario } = await req.json();

    if (!nombre || !usuario || !password) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const existente = await prisma.usuarios.findUnique({
      where: { usuario },
    });

    if (existente) {
      return NextResponse.json({ error: 'Usuario ya registrado' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombre,
        usuario,
        password: hash,
        rol: 'usuario', 
      },
    });

    return NextResponse.json(nuevoUsuario);
  } catch (error) {
    console.error('❌ Error al registrar:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

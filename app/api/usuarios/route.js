import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET(req) {
  const token = await getToken({ req });

  if (!token || token.rol !== 'administrador') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const usuarios = await prisma.usuarios.findMany({
    select: {
      id: true,
      nombre: true,
      usuario: true,
      rol: true,
    },
  });

  return NextResponse.json(usuarios);
}

export async function POST(req) {
  const token = await getToken({ req });

  if (!token || token.rol !== 'administrador') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { nombre, usuario, password, rol } = await req.json();

  if (!nombre || !usuario || !password) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  const existente = await prisma.usuarios.findUnique({ where: { usuario } });

  if (existente) {
    return NextResponse.json({ error: 'Usuario ya registrado' }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);

  const nuevo = await prisma.usuarios.create({
    data: {
      nombre,
      usuario,
      password: hash,
      rol: rol === 'administrador' ? 'administrador' : 'usuario',
    },
    select: {
      id: true,
      nombre: true,
      usuario: true,
      rol: true,
    },
  });

  return NextResponse.json(nuevo);
}

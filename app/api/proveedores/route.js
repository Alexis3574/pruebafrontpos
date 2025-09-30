import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const proveedores = await prisma.proveedores.findMany();
    return NextResponse.json(proveedores);
  } catch (error) {
    console.error('❌ Error al obtener proveedores:', error);
    return NextResponse.json({ error: 'Error al obtener proveedores' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const nuevo = await prisma.proveedores.create({
      data: body, 
    });

    return NextResponse.json(nuevo);
  } catch (error) {
    console.error('❌ Error al crear proveedor:', error);
    return NextResponse.json({ error: 'Error al crear proveedor' }, { status: 500 });
  }
}

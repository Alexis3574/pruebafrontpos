// app/api/detalle_ventas/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - obtener todos
export async function GET() {
  try {
    const data = await prisma.detalle_ventas.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error al obtener detalle_ventas', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📝 Body recibido:', body);

    const { venta_id, producto_id, cantidad, precio_unitario } = body;

    // Validaciones básicas
    if (
      !venta_id ||
      !producto_id ||
      typeof cantidad !== 'number' ||
      typeof precio_unitario !== 'number'
    ) {
      return NextResponse.json(
        { message: 'Faltan o son inválidos los campos requeridos' },
        { status: 400 }
      );
    }

    // Validar existencia de la venta
    const ventaExiste = await prisma.ventas.findUnique({ where: { id: venta_id } });
    if (!ventaExiste) {
      return NextResponse.json(
        { message: `No existe la venta con ID ${venta_id}` },
        { status: 400 }
      );
    }

    // Validar existencia del producto
    const productoExiste = await prisma.productos.findUnique({ where: { id: producto_id } });
    if (!productoExiste) {
      return NextResponse.json(
        { message: `No existe el producto con ID ${producto_id}` },
        { status: 400 }
      );
    }

    // Crear el detalle_venta
    const nuevo = await prisma.detalle_ventas.create({
      data: body,
    });

    return NextResponse.json(nuevo);
  } catch (error) {
    console.error('❌ Error al crear detalle_venta:', error);
    return NextResponse.json(
      { message: 'Error al crear detalle_venta', details: error.message },
      { status: 400 }
    );
  }
}


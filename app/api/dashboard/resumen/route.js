import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const ventasDia = await prisma.ventas.aggregate({
      _sum: { total: true },
      where: { fecha: { gte: hoy } },
    });

    const stockMinimo = 5;

    const productosBajoStock = await prisma.productos.count({
      where: { stock: { lt: stockMinimo } },
    });

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 7);

    const proximosCaducar = await prisma.productos.count({
      where: {
        fechacaducidad: {
          gte: hoy,
          lte: fechaLimite,
        },
      },
    });

    const masVendido = await prisma.detalleventas.groupBy({
      by: ['productoid'],
      _sum: { cantidad: true },
      orderBy: {
        _sum: { cantidad: 'desc' },
      },
      take: 1,
    });

    const productoTop = masVendido[0]
      ? await prisma.productos.findUnique({
          where: { id: masVendido[0].productoid },
        })
      : null;

    const hoyISO = new Date();
    hoyISO.setHours(23, 59, 59, 999);
    const hace7dias = new Date();
    hace7dias.setDate(hoyISO.getDate() - 6);
    hace7dias.setHours(0, 0, 0, 0);

    const ventasUltimosDias = await prisma.ventas.findMany({
      where: {
        fecha: {
          gte: hace7dias,
          lte: hoyISO,
        },
      },
      select: {
        fecha: true,
        total: true,
      },
    });

    const ventasPorDia = {};
    for (let i = 0; i < 7; i++) {
      const dia = new Date(hace7dias);
      dia.setDate(dia.getDate() + i);
      const key = dia.toISOString().split('T')[0];
      ventasPorDia[key] = 0;
    }

    for (const venta of ventasUltimosDias) {
      const key = venta.fecha.toISOString().split('T')[0];
      ventasPorDia[key] += parseFloat(venta.total);
    }

    const grafico = Object.entries(ventasPorDia).map(([day, ventas]) => ({
      day,
      ventas,
    }));

    const movimientos = await prisma.movimientosinventario.findMany({
      orderBy: { fecha: 'desc' },
      take: 10,
      include: {
        productos: {
          select: { nombre: true },
        },
      },
    });

    const movimientosDetallados = movimientos.map((mov) => ({
      id: mov.id,
      tipo: mov.tipo,
      producto: mov.productos?.nombre || 'Desconocido',
      cantidad: mov.cantidad,
      fecha: mov.fecha.toISOString().split('T')[0],
    }));

    return NextResponse.json({
      ventasDia: ventasDia._sum.total || 0,
      stockBajo: productosBajoStock,
      proximosCaducar,
      masVendido: productoTop?.nombre || 'N/A',
      grafico,
      movimientos: movimientosDetallados,
    });
  } catch (error) {
    console.error('❌ Error en resumen global:', error);
    return NextResponse.json({ error: 'Error al cargar resumen' }, { status: 500 });
  }
}

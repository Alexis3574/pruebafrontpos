import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fecha = searchParams.get("fecha");

    let where = {};

    if (fecha === "hoy") {
      const inicio = dayjs().startOf("day").toDate();
      const fin = dayjs().endOf("day").toDate();

      where = {
        ventas: {
          fecha: {
            gte: inicio,
            lte: fin,
          },
        },
      };
    }

    const detalles = await prisma.detalleventas.findMany({
      where,
      include: {
        productos: true,
        ventas: true,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(detalles);
  } catch (error) {
    console.error("❌ Error en GET /api/detalleVentas:", error);
    return NextResponse.json(
      { error: "Error al obtener detalleventas", detail: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const productoid = parseInt(body.productoid);
    const cantidad = parseInt(body.cantidad);
    const preciounitario = parseFloat(body.preciounitario);

    if (
      isNaN(productoid) ||
      isNaN(cantidad) ||
      cantidad <= 0 ||
      isNaN(preciounitario)
    ) {
      return NextResponse.json(
        { error: "Datos inválidos o incompletos" },
        { status: 400 }
      );
    }

    const producto = await prisma.productos.findUnique({
      where: { id: productoid },
    });

    if (!producto) {
      return NextResponse.json(
        { error: `El producto con ID ${productoid} no existe.` },
        { status: 404 }
      );
    }

    if (producto.stock < cantidad) {
      return NextResponse.json(
        {
          error: `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`,
        },
        { status: 400 }
      );
    }

    const nuevaVenta = await prisma.ventas.create({
      data: {
        metodopago: "Pendiente",
        total: preciounitario * cantidad,
      },
    });

    const nuevoDetalle = await prisma.detalleventas.create({
      data: {
        ventaid: nuevaVenta.id,
        productoid,
        cantidad,
        preciounitario,
      },
      include: {
        productos: true,
        ventas: true,
      },
    });

    // 4) Actualizar stock
    await prisma.productos.update({
      where: { id: productoid },
      data: {
        stock: { decrement: cantidad },
      },
    });

    return NextResponse.json(nuevoDetalle);
  } catch (error) {
    console.error("❌ Error en POST /api/detalleVentas:", error);
    return NextResponse.json(
      { error: "Error en el servidor", detail: error.message },
      { status: 500 }
    );
  }
}

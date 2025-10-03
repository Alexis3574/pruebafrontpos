import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_, { params }) {
  const { param } = params;

  try {
    let config;

    if (!isNaN(Number(param))) {
      // 🔹 Buscar por id
      config = await prisma.configuracion.findUnique({
        where: { id: Number(param) },
      });
    } else {
      // 🔹 Buscar por clave
      config = await prisma.configuracion.findUnique({
        where: { clave: param },
      });
    }

    if (!config) {
      return NextResponse.json({ error: "No encontrada" }, { status: 404 });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("❌ Error en GET:", error);
    return NextResponse.json({ error: "Error al obtener configuración" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { param } = params;
  const body = await req.json();

  try {
    let updated;

    if (!isNaN(Number(param))) {
      // 🔹 Actualizar por id
      updated = await prisma.configuracion.update({
        where: { id: Number(param) },
        data: body,
      });
    } else {
      // 🔹 Actualizar/crear por clave (upsert)
      updated = await prisma.configuracion.upsert({
        where: { clave: param },
        update: { valor: body.valor },
        create: { clave: param, valor: body.valor },
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error en PUT:", error);
    return NextResponse.json({ error: "Error al actualizar configuración" }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const { param } = params;

  try {
    let deleted;

    if (!isNaN(Number(param))) {
      // 🔹 Eliminar por id
      deleted = await prisma.configuracion.delete({
        where: { id: Number(param) },
      });
    } else {
      // 🔹 Eliminar por clave
      deleted = await prisma.configuracion.delete({
        where: { clave: param },
      });
    }

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("❌ Error en DELETE:", error);
    return NextResponse.json({ error: "Error al eliminar configuración" }, { status: 500 });
  }
}

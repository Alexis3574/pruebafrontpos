import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * ✅ PUT /api/configuracion/[param]
 * Crea o actualiza configuración por clave (no por ID)
 */
export async function PUT(req, context) {
  try {
    const { param } = await context.params;
    const body = await req.json();

    if (!param || typeof param !== "string") {
      return NextResponse.json({ error: "Parámetro inválido" }, { status: 400 });
    }

    const valorString = typeof body.valor === "string"
      ? body.valor
      : JSON.stringify(body.valor);

    // 🔍 Buscar si existe
    const existente = await prisma.configuracion.findUnique({
      where: { clave: param },
    });

    let resultado;
    if (existente) {
      resultado = await prisma.configuracion.update({
        where: { clave: param },
        data: { valor: valorString },
      });
    } else {
      resultado = await prisma.configuracion.create({
        data: { clave: param, valor: valorString },
      });
    }

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("❌ Error en PUT:", error);
    return NextResponse.json(
      { error: "Error al actualizar o crear configuración", detalle: error.message },
      { status: 500 }
    );
  }
}

/**
 * ✅ GET /api/configuracion/[param]
 */
export async function GET(_req, context) {
  try {
    const { param } = await context.params;
    const config = await prisma.configuracion.findUnique({
      where: { clave: param },
    });

    if (!config)
      return NextResponse.json({ error: "Configuración no encontrada" }, { status: 404 });

    let valorParseado = config.valor;
    try {
      valorParseado = JSON.parse(config.valor);
    } catch {}

    return NextResponse.json({ ...config, valor: valorParseado });
  } catch (error) {
    console.error("❌ Error en GET:", error);
    return NextResponse.json(
      { error: "Error al obtener configuración", detalle: error.message },
      { status: 500 }
    );
  }
}

/**
 * ✅ DELETE /api/configuracion/[param]
 */
export async function DELETE(_req, context) {
  try {
    const { param } = await context.params;
    const eliminado = await prisma.configuracion.delete({
      where: { clave: param },
    });
    return NextResponse.json(eliminado);
  } catch (error) {
    console.error("❌ Error en DELETE:", error);
    return NextResponse.json(
      { error: "Error al eliminar configuración", detalle: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(_request, { params }) {
  try {
    const { id } = params;
    const item = await prisma.reportes.findUnique({ where: { id: Number(id) } });
    if (!item) return NextResponse.json({ error: "Reporte no encontrado" }, { status: 404 });
    return NextResponse.json({ data: item });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno al obtener el reporte" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { id } = params;
    const existing = await prisma.reportes.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ error: "Reporte no encontrado" }, { status: 404 });

    const body = await request.json().catch(() => ({}));
    const { tipo, contenido, fecha } = body || {};

    const data = {};
    if (typeof tipo === "string") data.tipo = tipo.trim();
    if (typeof contenido === "string") data.contenido = contenido.trim();
    if (fecha) {
      const f = new Date(fecha);
      if (!isNaN(f)) data.fecha = f;
    }

    if (!Object.keys(data).length) {
      return NextResponse.json({ error: "No hay cambios para actualizar." }, { status: 400 });
    }

    const updated = await prisma.reportes.update({ where: { id: Number(id) }, data });
    return NextResponse.json({ data: updated, message: "Reporte actualizado correctamente." });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno al actualizar el reporte" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { id } = params;
    const existing = await prisma.reportes.findUnique({ where: { id: Number(id) } });
    if (!existing) return NextResponse.json({ error: "Reporte no encontrado" }, { status: 404 });

    await prisma.reportes.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Reporte eliminado correctamente." });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno al eliminar el reporte" }, { status: 500 });
  }
}

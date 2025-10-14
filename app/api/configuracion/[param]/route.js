import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/generated/prisma/client"; // Asegúrate de que este path sea correcto

export async function GET(request, { params }) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { param } = await params;
    const usuarioid = token.id;

    const config = await prisma.configuracion.findUnique({
      where: { clave_usuarioid: { clave: param, usuarioid } },
    });

    if (!config) {
      return NextResponse.json({ error: "Configuración no encontrada" }, { status: 404 });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("❌ Error en GET /configuracion/[param]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { param } = await params;
    const usuarioid = token.id;
    const body = await request.json();

    const updated = await prisma.configuracion.upsert({
      where: { clave_usuarioid: { clave: param, usuarioid } },
      update: { valor: body.valor },
      create: { clave: param, valor: body.valor, usuarioid },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error en PUT /configuracion/[param]:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

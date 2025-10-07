
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const configuraciones = await prisma.configuracion.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(configuraciones);
  } catch (error) {
    console.error(" Error en GET general:", error);
    return NextResponse.json(
      { error: "Error al obtener configuraciones", detalle: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { clave, valor } = await req.json();

    if (!clave) {
      return NextResponse.json(
        { error: "Falta la clave de configuración" },
        { status: 400 }
      );
    }

    const nueva = await prisma.configuracion.create({
      data: {
        clave: String(clave),
        valor: JSON.stringify(valor ?? null),
      },
    });

    return NextResponse.json(nueva);
  } catch (error) {
    console.error(" Error en POST:", error);
    return NextResponse.json(
      { error: "Error al crear configuración" },
      { status: 500 }
    );
  }
}

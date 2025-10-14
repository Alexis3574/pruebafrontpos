import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const carrito = await prisma.carrito.findFirst({
    where: { usuarioId: token.id, estado: "pendiente" },
    include: { items: true }
  });

  if (!carrito || carrito.items.length === 0) {
    return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
  }

  await prisma.carrito.update({
    where: { id: carrito.id },
    data: { estado: "confirmado" }
  });

  return NextResponse.json({ ok: true, message: "Carrito confirmado como orden de venta" });
}

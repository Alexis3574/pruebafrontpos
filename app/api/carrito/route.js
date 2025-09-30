import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

function getUserIdFromToken(token) {
  const raw = token?.id ?? token?.sub; 
  const num = Number(raw);
  return Number.isFinite(num) ? num : null;
}

export async function GET(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ error: "ID de usuario inválido en el token" }, { status: 400 });
    }

    const carritos = await prisma.carrito.findMany({
      where: { usuarioId: userId },
      include: {
        usuarios: { select: { id: true, nombre: true, usuario: true } }, 
        items: {
          include: {
            producto: { select: { id: true, nombre: true, precioventa: true } },
          },
        },
      },
    });

    return NextResponse.json(carritos);
  } catch (err) {
    console.error("❌ Error en GET carrito:", err);
    return NextResponse.json({ error: "Error en GET carrito", detalle: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const userIdRaw = token.id ?? token.sub;
    const userId = Number(userIdRaw);
    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json({ error: "ID de usuario inválido" }, { status: 400 });
    }

    const body = await req.json();

    const pid = Number(body.productoId ?? body.productoid);
    const qty = Number(body.cantidad);
    let unit = body.precio ?? body.preciounitario;

    if (!Number.isFinite(pid) || !Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json(
        { error: "productoId y cantidad son obligatorios" },
        { status: 400 }
      );
    }

    if (unit == null || !Number.isFinite(Number(unit))) {
      const prod = await prisma.productos.findUnique({
        where: { id: pid },
        select: { precioventa: true },
      });
      unit = prod?.precioventa ? Number(prod.precioventa) : 0;
    } else {
      unit = Number(unit);
    }

    
    let carrito = await prisma.carrito.findFirst({
      where: { usuarioId: userId, estado: "pendiente" },
      select: { id: true },
    });
    if (!carrito) {
      carrito = await prisma.carrito.create({
        data: { usuarioId: userId }, 
        select: { id: true },
      });
    }

    const existente = await prisma.carritoItem.findFirst({
      where: { carritoId: carrito.id, productoId: pid },
      select: { id: true, cantidad: true },
    });

    let item;
    if (existente) {
      item = await prisma.carritoItem.update({
        where: { id: existente.id },
        data: { cantidad: existente.cantidad + qty, precio: unit },
        include: { producto: true },
      });
    } else {
      item = await prisma.carritoItem.create({
        data: {
          carritoId: carrito.id,
          productoId: pid,
          cantidad: qty,
          precio: unit,
        },
        include: { producto: true },
      });
    }

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("❌ Error en POST carrito:", err);
    return NextResponse.json({ error: "Error en POST carrito", detalle: err.message }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ error: "ID de usuario inválido en el token" }, { status: 400 });
    }

    const { itemId, cantidad } = await req.json();
    if (!itemId || typeof cantidad !== "number") {
      return NextResponse.json({ error: "itemId y cantidad numérica son obligatorios" }, { status: 400 });
    }

    const item = await prisma.carritoItem.findUnique({
      where: { id: itemId },
      include: { carrito: true },
    });
    if (!item || item.carrito.usuarioId !== userId) {
      return NextResponse.json({ error: "Item no pertenece al usuario" }, { status: 403 });
    }

    const actualizado = await prisma.carritoItem.update({
      where: { id: itemId },
      data: { cantidad },
    });

    return NextResponse.json(actualizado);
  } catch (err) {
    console.error("❌ Error en PUT carrito:", err);
    return NextResponse.json({ error: "Error en PUT carrito", detalle: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ error: "ID de usuario inválido en el token" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const itemId = Number(searchParams.get("itemId"));
    if (!itemId) return NextResponse.json({ error: "itemId inválido" }, { status: 400 });

    const item = await prisma.carritoItem.findUnique({
      where: { id: itemId },
      include: { carrito: true },
    });
    if (!item || item.carrito.usuarioId !== userId) {
      return NextResponse.json({ error: "Item no pertenece al usuario" }, { status: 403 });
    }

    await prisma.carritoItem.delete({ where: { id: itemId } });
    return NextResponse.json({ message: "Item eliminado correctamente" });
  } catch (err) {
    console.error("❌ Error en DELETE carrito:", err);
    return NextResponse.json({ error: "Error en DELETE carrito", detalle: err.message }, { status: 500 });
  }
}

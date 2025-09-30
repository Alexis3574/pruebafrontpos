// app/api/facturas/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const json = (obj, status = 200) =>
  new NextResponse(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

// ✅ PUT - Actualizar factura
export async function PUT(req, { params }) {
  try {
    const id = Number(params.id);
    if (!id || isNaN(id)) {
      return json({ ok: false, error: "ID inválido" }, 400);
    }

    const data = await req.json();

    const factura = await prisma.facturas.findUnique({ where: { id } });
    if (!factura) {
      return json({ ok: false, error: "Factura no encontrada" }, 404);
    }

    // Evita cambios en el ID autoincremental
    if ("id" in data) delete data.id;

    const actualizada = await prisma.facturas.update({
      where: { id },
      data,
      include: { items: true },
    });

    return json({ ok: true, data: actualizada });
  } catch (error) {
    console.error("❌ Error al actualizar factura:", error);
    return json({ ok: false, error: "Error al actualizar factura", details: error.message }, 500);
  }
}

// ✅ DELETE - Eliminar factura
export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id);
    if (!id || isNaN(id)) {
      return json({ ok: false, error: "ID inválido" }, 400);
    }

    const factura = await prisma.facturas.findUnique({ where: { id } });
    if (!factura) {
      return json({ ok: false, error: "Factura no encontrada" }, 404);
    }

    // Si quieres eliminar también los items relacionados:
    await prisma.factura_items.deleteMany({ where: { facturaId: id } });

    await prisma.facturas.delete({ where: { id } });

    return json({ ok: true, message: "Factura eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar factura:", error);
    return json({ ok: false, error: "Error al eliminar factura", details: error.message }, 500);
  }
}

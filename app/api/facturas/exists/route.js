// app/api/facturas/exists/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const json = (obj, status = 200) =>
  new NextResponse(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

function parsePattern(str) {
  // Devuelve { prefix, numStr, num } para folios tipo "A-00123", "FAC2025-0007" o solo "0009"
  if (typeof str !== "string") return { prefix: "", numStr: "", num: NaN };
  const m = String(str).match(/^(\D*?)(\d+)$/); // prefijo no-dígitos + dígitos al final
  if (!m) return { prefix: "", numStr: "", num: NaN };
  return { prefix: m[1], numStr: m[2], num: Number(m[2]) };
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const folio = (searchParams.get("folio") || "").trim();
    const serie = (searchParams.get("serie") || "").trim();

    if (!folio) return json({ ok: false, error: "Parámetro 'folio' requerido." }, 400);

    // ¿Existe exactamente este folio (y serie si se envía)?
    const where = {
      folio,
      ...(serie ? { serie } : { serie: null }),
    };

    // Nota: si permites folios duplicados entre series, quita "serie: null" cuando no venga
    const existing = await prisma.facturas.findFirst({
      where,
      select: { id: true, folio: true, serie: true },
    });

    // --------- Sugerencia de siguiente folio (best-effort) ----------
    // Tomamos últimas 200 facturas con misma serie (o null) y buscamos el mayor número al final
    let suggestion = null;
    const { prefix, numStr, num } = parsePattern(folio);

    if (!Number.isNaN(num)) {
      const sameSerie = await prisma.facturas.findMany({
        where: serie ? { serie } : { serie: null },
        orderBy: { createdAt: "desc" },
        take: 200,
        select: { folio: true },
      });

      // Filtra por mismo prefijo y toma el máximo número
      let maxNum = num;
      let width = numStr.length;

      for (const r of sameSerie) {
        if (!r.folio) continue;
        const p = parsePattern(r.folio);
        if (p.prefix === prefix && !Number.isNaN(p.num)) {
          maxNum = Math.max(maxNum, p.num);
          width = Math.max(width, p.numStr.length);
        }
      }

      const nextNum = maxNum + 1;
      const padded = String(nextNum).padStart(width, "0");
      suggestion = `${prefix}${padded}`;
    }

    return json({
      ok: true,
      exists: Boolean(existing),
      match: existing || null,
      suggestion, // null si no pudo inferir patrón
    });
  } catch (err) {
    console.error("GET /api/facturas/exists error", err);
    return json({ ok: false, error: "Error al verificar folio." }, 500);
  }
}

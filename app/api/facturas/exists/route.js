import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const json = (obj, status = 200) =>
  new NextResponse(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

function parsePattern(str) {
  if (typeof str !== "string") return { prefix: "", numStr: "", num: NaN };
  const m = String(str).match(/^(\D*?)(\d+)$/); 
  if (!m) return { prefix: "", numStr: "", num: NaN };
  return { prefix: m[1], numStr: m[2], num: Number(m[2]) };
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const folio = (searchParams.get("folio") || "").trim();
    const serie = (searchParams.get("serie") || "").trim();

    if (!folio) return json({ ok: false, error: "Parámetro 'folio' requerido." }, 400);

    const where = {
      folio,
      ...(serie ? { serie } : { serie: null }),
    };

    const existing = await prisma.facturas.findFirst({
      where,
      select: { id: true, folio: true, serie: true },
    });

 
    let suggestion = null;
    const { prefix, numStr, num } = parsePattern(folio);

    if (!Number.isNaN(num)) {
      const sameSerie = await prisma.facturas.findMany({
        where: serie ? { serie } : { serie: null },
        orderBy: { createdAt: "desc" },
        take: 200,
        select: { folio: true },
      });

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
      suggestion, 
    });
  } catch (err) {
    console.error("GET /api/facturas/exists error", err);
    return json({ ok: false, error: "Error al verificar folio." }, 500);
  }
}

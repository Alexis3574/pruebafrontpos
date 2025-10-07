import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const json = (obj, status = 200, headers = {}) =>
  new NextResponse(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });

const badRequest = (msg, details) => json({ ok: false, error: msg, details }, 400);
const conflict   = (msg, details) => json({ ok: false, error: msg, details }, 409);
const serverErr  = (msg, details, reqId) =>
  json({ ok: false, error: msg, details, requestId: reqId }, 500);

const isStr  = (v) => typeof v === "string";
const nonEmp = (v) => isStr(v) && v.trim().length > 0;
const isPct  = (v) => Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 100;
const isPos  = (v) => Number.isFinite(Number(v)) && Number(v) > 0;
const isNonNeg = (v) => Number.isFinite(Number(v)) && Number(v) >= 0;

function computeTotals(items = [], tasaGlobal = 16) {
  let subtotal = 0, iva = 0, descuentos = 0;
  items.forEach((it) => {
    const cantidad = Number(it.cantidad || 0);
    const precio   = Number(it.precio || 0);
    const descPct  = Number(it.descuento || 0);
    const base     = cantidad * precio;
    const desc     = base * (descPct / 100);
    const baseDesc = base - desc;
    const tasaIva  = (it.iva ?? tasaGlobal);
    const ivaItem  = baseDesc * (Number(tasaIva) / 100);
    subtotal += baseDesc; iva += ivaItem; descuentos += desc;
  });
  const total = subtotal + iva;
  return {
    subtotal: Number(subtotal.toFixed(2)),
    iva: Number(iva.toFixed(2)),
    descuentos: Number(descuentos.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

function validateBody(body) {
  const errors = {};

  if (!body || typeof body !== "object") {
    return { ok: false, errors: { _general: "Cuerpo JSON inválido." } };
  }

  if (!nonEmp(body.negocioNombre)) errors.negocioNombre = "Nombre del negocio es obligatorio.";
  if (!nonEmp(body.clienteNombre)) errors.clienteNombre = "Nombre/Razón social del cliente es obligatorio.";

  if (body.folio != null) {
    if (!isStr(body.folio)) errors.folio = "Folio debe ser texto.";
    else if (body.folio.length > 50) errors.folio = "Folio máximo 50 caracteres.";
  }

  if (body.tasaIvaGlobal == null || !isPct(body.tasaIvaGlobal)) {
    errors.tasaIvaGlobal = "IVA global debe estar entre 0 y 100.";
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) errors.items = "Debes enviar al menos un concepto.";

  const itemErrors = [];
  items.forEach((it, idx) => {
    const e = {};
    if (!nonEmp(it.descripcion)) e.descripcion = "Descripción obligatoria.";
    if (!isPos(it.cantidad)) e.cantidad = "Cantidad > 0.";
    if (!isNonNeg(it.precio)) e.precio = "Precio ≥ 0.";
    if (it.descuento != null && !isPct(it.descuento)) e.descuento = "Descuento 0–100%.";
    if (it.iva != null && !isPct(it.iva)) e.iva = "IVA 0–100%.";
    if (Object.keys(e).length) itemErrors[idx] = e;
  });
  if (itemErrors.length) errors.itemsDetail = itemErrors;

  return { ok: Object.keys(errors).length === 0, errors };
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    if (searchParams.get("health") === "1") {
      let db = false;
      try {
        await prisma.$queryRaw`SELECT 1`;
        db = true;
      } catch (e) {
        db = false;
      }
      const prismaVersion = prisma?._clientVersion || "unknown";
      const count = db ? await prisma.facturas.count().catch(() => null) : null;
      return json({
        ok: true,
        service: "facturas",
        time: new Date().toISOString(),
        db,
        prismaVersion,
        count,
      });
    }

    const data = await prisma.facturas.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    return json({ ok: true, data });
  } catch (err) {
    const reqId = crypto.randomUUID();
    console.error("GET /api/facturas error", reqId, err);
    return serverErr("Error al listar facturas.", undefined, reqId);
  }
}

export async function POST(req) {
  const reqId = crypto.randomUUID();
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return badRequest("El cuerpo debe ser JSON válido.");
    }

    const v = validateBody(body);
    if (!v.ok) return badRequest("Validación fallida.", v.errors);

    if (body.folio || body.serie) {
      const exists = await prisma.facturas.findFirst({
        where: {
          folio: body.folio ?? undefined,
          serie: body.serie ?? undefined,
        },
        select: { id: true, folio: true, serie: true },
      });
      if (exists) {
        return conflict("Folio ya registrado para la serie.", { serie: exists.serie, folio: exists.folio });
      }
    }

    const { subtotal, iva, descuentos, total } = computeTotals(body.items, Number(body.tasaIvaGlobal ?? 16));

    const factura = await prisma.facturas.create({
      data: {
        ventaid: body.ventaid ?? null,
        folio: body.folio ?? null,
        serie: body.serie ?? null,
        fecha: body.fecha ? new Date(body.fecha) : undefined,
        moneda: body.moneda ?? "MXN",
        formaPago: body.formaPago ?? "PUE",
        metodoPago: body.metodoPago ?? "99",
        usoCfdi: body.usoCfdi ?? "P01",
        tasaIvaGlobal: body.tasaIvaGlobal ?? 16,
        observaciones: body.observaciones ?? null,

        subtotal, iva, descuentos, total,

        negocioNombre: body.negocioNombre,
        negocioRfc: body.negocioRfc ?? null,
        negocioDir: body.negocioDir ?? null,
        negocioTel: body.negocioTel ?? null,
        negocioEmail: body.negocioEmail ?? null,

        clienteNombre: body.clienteNombre,
        clienteRfc: body.clienteRfc ?? null,
        clienteCp: body.clienteCp ?? null,
        clienteDir: body.clienteDir ?? null,
        clienteEmail: body.clienteEmail ?? null,
        clienteTel: body.clienteTel ?? null,

        items: {
          createMany: {
            data: (body.items || []).map((it) => {
              const cantidad = Number(it.cantidad || 0);
              const precio   = Number(it.precio || 0);
              const descPct  = Number(it.descuento || 0);
              const base     = cantidad * precio;
              const desc     = base * (descPct / 100);
              const baseDesc = base - desc;
              const tasaIva  = Number((it.iva ?? body.tasaIvaGlobal ?? 16));
              const ivaItem  = baseDesc * (tasaIva / 100);
              const importe  = Number((baseDesc + ivaItem).toFixed(2));

              return {
                descripcion: String(it.descripcion),
                cantidad,
                precio,
                descuento: Number(descPct.toFixed?.(2) ?? descPct),
                iva: Number(tasaIva.toFixed?.(2) ?? tasaIva),
                importe,
              };
            }),
          },
        },
      },
      include: { items: true },
    });

    return json({ ok: true, data: factura }, 201);
  } catch (err) {
    
    const code = err?.code;
    if (code === "P2002") {
      return conflict("Clave única duplicada (posible folio ya existente).", { code, meta: err.meta });
    }
    if (code === "P2003") {
      return badRequest("Relación inválida (ventaid no existe).", { code, meta: err.meta });
    }
    console.error("POST /api/facturas error", reqId, err);
    return serverErr("Error al crear la factura.", undefined, reqId);
  }
}

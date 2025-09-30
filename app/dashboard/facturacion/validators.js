export const nonEmpty = (v) => String(v ?? "").trim().length > 0;
export const isPct = (v) => Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 100;
export const isPos = (v) => Number.isFinite(Number(v)) && Number(v) > 0;
export const isNonNeg = (v) => Number.isFinite(Number(v)) && Number(v) >= 0;

export function validateFacturaPayload(b) {
  const errors = {};
  if (!nonEmpty(b.negocioNombre)) errors.negocioNombre = "Nombre del negocio es obligatorio.";
  if (!nonEmpty(b.clienteNombre)) errors.clienteNombre = "Nombre del cliente es obligatorio.";
  if (!isPct(b.tasaIvaGlobal)) errors.tasaIvaGlobal = "IVA global 0–100%";

  const items = Array.isArray(b.items) ? b.items : [];
  if (!items.length) errors.items = "Agrega al menos un concepto.";

  const perItem = [];
  items.forEach((it, i) => {
    const e = {};
    if (!nonEmpty(it.descripcion)) e.descripcion = "Descripción obligatoria.";
    if (!isPos(it.cantidad)) e.cantidad = "Cantidad > 0.";
    if (!isNonNeg(it.precio)) e.precio = "Precio ≥ 0.";
    if (it.descuento != null && !isPct(it.descuento)) e.descuento = "Descuento 0–100%.";
    if (it.iva != null && !isPct(it.iva)) e.iva = "IVA 0–100%.";
    if (Object.keys(e).length) perItem[i] = e;
  });
  if (perItem.length) errors.itemsDetail = perItem;
  return { ok: Object.keys(errors).length === 0, errors };
}

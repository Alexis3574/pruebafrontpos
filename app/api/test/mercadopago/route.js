import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req) {
  try {
    const {
      email = "comprador@test.com",
      total = 15.99,
      descripcion = "Pago sandbox Zacru",
    } = await req.json().catch(() => ({}));

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN_TEST;

    if (!accessToken) {
      return NextResponse.json(
        { ok: false, message: "❌ Falta MERCADOPAGO_ACCESS_TOKEN_TEST en .env.local" },
        { status: 500 }
      );
    }

    // ✅ Crear cliente con token de prueba
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    // ✅ Crear preferencia sin auto_return (funciona perfecto en local)
    const result = await preference.create({
      body: {
        items: [
          {
            title: descripcion,
            quantity: 1,
            unit_price: Number(total),
            currency_id: "MXN",
          },
        ],
        payer: { email },
        back_urls: {
          success: "https://example.com/success",
          failure: "https://example.com/failure",
          pending: "https://example.com/pending",
        },
      },
    });

    return NextResponse.json({
      ok: true,
      message: "✅ Preferencia creada correctamente en modo sandbox",
      init_point: result.init_point,
      sandbox_preference_id: result.id,
    });
  } catch (err) {
    console.error("❌ Error en /api/test/mercadopago:", err);
    return NextResponse.json(
      { ok: false, message: err.message || "Error desconocido" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "🧪 Endpoint de prueba de Mercado Pago activo. Usa POST para crear una preferencia sandbox.",
  });
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    // Inicializar Stripe dentro del handler (no en el módulo) para evitar errores en build
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      apiVersion: "2026-03-25.dahlia",
    });

    const { titulo, precio } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: titulo,
              description: "Lámina firmada y numerada por Borja Satrústegui",
              images: [],
            },
            unit_amount: Math.round(precio * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL || "https://borjasatrustegui.com"}/tienda?exito=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "https://borjasatrustegui.com"}/tienda?cancelado=1`,
      locale: "es",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["ES", "FR", "PT", "DE", "IT", "GB", "NL", "BE", "AT", "SE", "DK", "NO", "FI"],
      },
      metadata: {
        producto: titulo,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Error al crear la sesión de pago" }, { status: 500 });
  }
}

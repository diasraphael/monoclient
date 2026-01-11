import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, isRecurring } = body;

    // Validate amount
    if (!amount || amount < 10) {
      return NextResponse.json(
        { error: "Amount must be at least NOK 10" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name: isRecurring
                ? "Monthly Donation to Good Shepherd Lanka"
                : "Donation to Good Shepherd Lanka",
              description:
                "Supporting education and care for children in Batticaloa, Sri Lanka",
              images: [`${appUrl}/logo.jpg`],
            },
            unit_amount: amount * 100, // Stripe uses cents/øre
            ...(isRecurring && {
              recurring: {
                interval: "month",
              },
            }),
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/donate/cancel`,
      metadata: {
        donation_type: isRecurring ? "monthly" : "one_time",
      },
      // Enable additional payment methods
      payment_method_options: {
        card: {
          setup_future_usage: isRecurring ? "off_session" : undefined,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

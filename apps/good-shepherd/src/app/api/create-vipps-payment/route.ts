import { NextResponse } from "next/server";
import { checkoutAPI } from "@/lib/vipps";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // Validate amount
    if (!amount || isNaN(amount) || amount < 50) {
      return NextResponse.json(
        { error: "Amount must be at least NOK 50" },
        { status: 400 }
      );
    }

    // Validate Vipps credentials
    if (!process.env.VIPPS_CLIENT_ID || !process.env.VIPPS_CLIENT_SECRET) {
      return NextResponse.json(
        { error: "Vipps is not configured. Please add credentials." },
        { status: 500 }
      );
    }

    // Generate unique reference for this donation
    const reference = `donation-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    // Create Vipps checkout session using SDK
    const response = await checkoutAPI.create(
      process.env.VIPPS_CLIENT_ID,
      process.env.VIPPS_CLIENT_SECRET,
      {
        type: "PAYMENT",
        transaction: {
          amount: {
            value: Math.round(amount * 100), // Convert NOK to øre (smallest unit)
            currency: "NOK",
          },
          reference,
          paymentDescription: "Donation to Good Shepherd Lanka",
        },
        merchantInfo: {
          callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/vipps-webhook`,
          returnUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/donate/success?reference=${reference}&provider=vipps`,
          callbackAuthorizationToken: crypto.randomBytes(32).toString("hex"),
        },
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorData = "data" in response ? response.data : response;
      console.error("Vipps API error:", errorData);
      throw new Error("Vipps API returned an error");
    }

    console.log(
      `Vipps payment created: ${reference}, checkoutFrontendUrl: ${response.data.checkoutFrontendUrl}`
    );

    return NextResponse.json({
      url: response.data.checkoutFrontendUrl,
      reference,
    });
  } catch (error: any) {
    console.error("Vipps payment error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to create Vipps payment",
        details: error.response?.data || error.toString(),
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { authAPI, recurringAPI } from "@/lib/vipps";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // Validate amount
    if (!amount || isNaN(amount) || amount < 50) {
      return NextResponse.json(
        { error: "Amount must be at least NOK 50 for monthly donations" },
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

    // Get auth token first (required for recurring API)
    const tokenResponse = await authAPI.getToken(
      process.env.VIPPS_CLIENT_ID,
      process.env.VIPPS_CLIENT_SECRET
    );

    if (!tokenResponse || !tokenResponse.access_token) {
      throw new Error("Failed to get Vipps auth token");
    }

    // Generate unique agreement ID
    const agreementId = `monthly-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    // Calculate how many children this supports
    const childrenCount = Math.floor(amount / 250);
    const productDescription =
      childrenCount > 0
        ? `Support ${childrenCount} ${childrenCount === 1 ? "child" : "children"} every month`
        : `Monthly donation of NOK ${amount}`;

    // Create recurring agreement (uses AvtaleGiro behind the scenes)
    const agreement = await recurringAPI.agreement.create(
      tokenResponse.access_token,
      {
        pricing: {
          type: "LEGACY",
          amount: Math.round(amount * 100), // Convert NOK to øre
          currency: "NOK",
        },
        interval: {
          unit: "MONTH",
          count: 1, // Charge every 1 month
        },
        merchantRedirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/donate/recurring-success?agreementId=${agreementId}`,
        merchantAgreementUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/donate`,
        productName: "Monthly Support - Good Shepherd Lanka",
        productDescription,
        // Initial charge happens immediately after approval
        initialCharge: {
          amount: Math.round(amount * 100),
          currency: "NOK",
          description: "First month donation",
          transactionType: "DIRECT_CAPTURE",
        },
      }
    );

    console.log(`Vipps recurring agreement created: ${agreementId}`);

    return NextResponse.json({
      url: agreement.vippsConfirmationUrl,
      agreementId: agreement.agreementId,
    });
  } catch (error: any) {
    console.error("Vipps recurring error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to create recurring donation",
        details: error.response?.data || error.toString(),
      },
      { status: 500 }
    );
  }
}

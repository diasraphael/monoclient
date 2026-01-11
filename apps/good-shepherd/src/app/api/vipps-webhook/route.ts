import { NextResponse } from "next/server";

/**
 * Vipps Webhook Handler
 *
 * Vipps will send webhook events for:
 * - Payment completed
 * - Payment failed
 * - Recurring charge successful
 * - Recurring charge failed
 * - Agreement stopped
 *
 * Configure this URL in your Vipps Portal:
 * https://yourdomain.com/api/vipps-webhook
 */
export async function POST(req: Request) {
  try {
    const event = await req.json();

    console.log("Vipps webhook received:", {
      type: event.eventType,
      reference: event.reference || event.agreementId,
      timestamp: event.timestamp,
    });

    // Handle different event types
    switch (event.eventType) {
      case "PAYMENT_COMPLETED":
        console.log(`✅ Payment completed: ${event.reference}`);
        // TODO: Update your database with successful payment
        // await recordDonation({
        //   reference: event.reference,
        //   amount: event.amount,
        //   status: "completed",
        //   provider: "vipps",
        // });
        break;

      case "PAYMENT_FAILED":
        console.log(`❌ Payment failed: ${event.reference}`);
        // TODO: Log failed payment
        break;

      case "CHARGE_SUCCESSFUL":
        console.log(`✅ Recurring charge successful: ${event.agreementId}`);
        // TODO: Record monthly donation
        // await recordRecurringDonation({
        //   agreementId: event.agreementId,
        //   chargeId: event.chargeId,
        //   amount: event.amount,
        //   status: "completed",
        // });
        break;

      case "CHARGE_FAILED":
        console.log(`❌ Recurring charge failed: ${event.agreementId}`);
        // TODO: Send email to donor to update payment info
        // await notifyDonorChargeFailure(event.agreementId);
        break;

      case "AGREEMENT_STOPPED":
        console.log(`🛑 Recurring agreement stopped: ${event.agreementId}`);
        // TODO: Send thank you email
        // await sendThankYouEmail(event.agreementId);
        break;

      default:
        console.log(`Unknown event type: ${event.eventType}`);
    }

    // Always return 200 OK to acknowledge receipt
    return NextResponse.json({ received: true, eventType: event.eventType });
  } catch (error) {
    console.error("Vipps webhook error:", error);

    // Still return 200 to avoid Vipps retrying
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 200 }
    );
  }
}

// Verify webhook signature (optional but recommended for production)
function verifyVippsSignature(payload: string, signature: string): boolean {
  // TODO: Implement signature verification using your Vipps secret
  // This ensures the webhook is actually from Vipps
  return true;
}

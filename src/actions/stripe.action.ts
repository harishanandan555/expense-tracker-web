"use server";

import { redirect } from "next/navigation";

import { priceId, stripe } from "@/lib/stripe";
import { createCustomer } from "@/services/stripe.services";

export async function Checkout() {
  const customer: any = await createCustomer();

  const checkout = await stripe.checkout.sessions.create({
    success_url: `${process.env.APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.APP_URL}/dashboard?success=false`,
    customer: customer.stripeCustomerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: customer.userId,
    },
    mode: "subscription",
  });

  return redirect(checkout.url as string);
}

export async function GenerateCustomerPortal() {
  const customer = await createCustomer();

  const portal = await stripe.billingPortal.sessions.create({
    customer: customer.stripeCustomerId,
    return_url: `${process.env.APP_URL}/settings`,
  });

  return redirect(portal.url as string);
}

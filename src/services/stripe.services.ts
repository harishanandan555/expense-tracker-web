// import { redirect } from "next/navigation";

// import { stripe } from "@/lib/stripe";
// import { getCurrentUser } from "./user.services";
// import { db } from "@/lib/db";

// export async function createCustomer() {
//   const user = await getCurrentUser();

//   if (!user) {
//     return redirect("/auth/sign-in");
//   }

//   const stripeCustomer = await db.stripeCustomer.findUnique({
//     where: {
//       userId: user.id,
//     },
//   });

//   if (!stripeCustomer) {
//     const customer = await stripe.customers.create({
//       email: String(user.email),
//     });

//     const updatedStripeCustomer = await db.stripeCustomer.create({
//       data: {
//         userId: user.id,
//         stripeCustomerId: customer.id,
//       },
//     });

//     return updatedStripeCustomer;
//   }

//   return stripeCustomer;
// }

// export async function hasSubscription() {
//   const customer = await createCustomer();

//   const subscription = await stripe.subscriptions.list({
//     customer: customer.stripeCustomerId,
//   });

//   return subscription.data.length > 0 ? true : false;
// }




import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/services/user.services";
import { storeStripeCustomer, getStripeCustomerByUserId } from "@/services/firebaseSettings";

export async function createCustomer() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  const stripeCustomer = await getStripeCustomerByUserId(user.id);

  if (!stripeCustomer) {
    const customer = await stripe.customers.create({
      email: String(user.email),
    });

    const newCustomerId = await storeStripeCustomer({
      userId: user.id,
      stripeCustomerId: customer.id,
    });

    return { id: newCustomerId, stripeCustomerId: customer.id };
  }

  return stripeCustomer;
}

export async function hasSubscription() {
  const customer = await createCustomer();

  const subscription = await stripe.subscriptions.list({
    customer: customer.stripeCustomerId,
  });

  return subscription.data.length > 0 ? true : false;
}

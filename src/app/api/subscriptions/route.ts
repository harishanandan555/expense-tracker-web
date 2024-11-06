import { hasSubscription } from "@/services/stripe.services";

export async function GET() {
	const subscription = await getSubscriptionAccess();

	return Response.json(subscription);
}

export type GetSubscriptionAccessResponse = Awaited<
	ReturnType<typeof getSubscriptionAccess>
>;

async function getSubscriptionAccess() {
	const hasAccess = await hasSubscription();

	return { hasAccess };
}

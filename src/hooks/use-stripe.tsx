import { useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Checkout, GenerateCustomerPortal } from "@/actions/stripe.action";
import { GetSubscriptionAccessResponse } from "@/app/api/subscriptions/route";

export const useStripe = () => {
	const { data, isLoading } = useQuery<GetSubscriptionAccessResponse>({
		queryKey: ["subscriptions"],
		queryFn: () => fetch("/api/subscriptions").then((res) => res.json()),
	});

	const checkoutMutation = useMutation({
		mutationFn: Checkout,
		onSuccess: () => {
			toast.success("Successfully redirected to checkout", { id: "checkout" });
		},
		onError: () => {
			toast.error("Something went wrong!", { id: "checkout" });
		},
	});

	const billingMutation = useMutation({
		mutationFn: GenerateCustomerPortal,
		onSuccess: () => {
			toast.success("Successfully redirected to billing", { id: "billing" });
		},
		onError: () => {
			toast.error("Something went wrong!", { id: "billing" });
		},
	});

	const onCheckout = useCallback(() => {
		checkoutMutation.mutate();
	}, [checkoutMutation]);

	const onManageBilling = useCallback(() => {
		billingMutation.mutate();
	}, [billingMutation]);

	return {
		hasAccess: data?.hasAccess,
		onCheckout,
		onManageBilling,
		isLoading,
	};
};

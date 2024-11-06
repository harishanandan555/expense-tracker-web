"use client";

import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/use-stripe";

type Props = {
  label?: string;
};

export const CheckoutButton = ({ label }: Props) => {
  const { hasAccess, onCheckout, isLoading } = useStripe();

  return (
    <SkeletonWrapper isLoading={isLoading} fullWidth>
      <Button onClick={onCheckout} disabled={hasAccess} className="w-full">
        {hasAccess
          ? "Already subsbribed!"
          : label
            ? label
            : "Process to checkout"}
      </Button>
    </SkeletonWrapper>
  );
};

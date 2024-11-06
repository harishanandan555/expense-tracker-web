"use client";

import Link from "next/link";
import { CreditCard, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStripe } from "@/hooks/use-stripe";
import { Badge } from "@/components/ui/badge";
import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";

export const BillingSection = () => {
  
  const { hasAccess, onManageBilling, isLoading } = useStripe();

  return (

    <SkeletonWrapper isLoading={isLoading} fullWidth>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-12 h-12 items-center rounded-lg bg-sky-600/10 p-2 text-sky-600" />
              Billing Information
            </div>
            <Button onClick={onManageBilling} variant="ghost">
              Manage Billing
            </Button>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4 flex flex-col items-center justify-center md:flex-row md:justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-2xl font-bold">
              {hasAccess ? "You're A" : "Become A"}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-transparent">
                Premium
              </span>{" "}
              User
            </div>
            <p className="text-muted-foreground">
              {hasAccess
                ? "Enjoy all premium user features."
                : "Upgrade to premium user and enjoy with all features."}
            </p>
          </div>
          {!hasAccess && (
            <Button asChild>
              <Link href="/upgrade" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Upgrade
              </Link>
            </Button>
          )}
          {hasAccess && <Badge>Premium User</Badge>}
        </CardContent>
      </Card>
    </SkeletonWrapper>

  );

};

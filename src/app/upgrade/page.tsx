import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FeatureField } from "./_components/feature-field";
import { plan } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "./_components/checkout-button";
import { LimitAlert } from "./_components/limit-alert";
import { getCurrentUser } from "@/services/user.services";

export default async function Page({
  searchParams,
}: {
  searchParams: { categoriesLimit?: string; transactionsLimit?: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="wrapper flex flex-col items-center justify-center gap-4 h-screen">
      <div className="text-center w-full space-y-1.5">
        <h1 className="text-4xl font-extrabold">
          Upgrade to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-transparent">
            Premium
          </span>{" "}
          User
        </h1>
      </div>
      <Separator />
      {searchParams?.transactionsLimit && (
        <LimitAlert
          title="Limit Reached!"
          description="Transactions limit reached! Subscribe to add more"
        />
      )}
      {searchParams?.categoriesLimit && (
        <LimitAlert
          title="Limit Reached!"
          description="Categories limit reached! Subscribe to add more"
        />
      )}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="sapce-y-3">
          {plan.features.map((feature) => (
            <FeatureField key={feature.id} label={feature.label} />
          ))}
        </CardContent>
        <CardFooter>
          <div>
            <span className="text-4xl font-extrabold">${plan.price}</span>
            <span className="text-muted-foreground text-xl">
              /{plan.interval}
            </span>
          </div>
        </CardFooter>
      </Card>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-2 w-full">
        <Button className="w-full" variant="outline" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
        <CheckoutButton />
      </div>
    </main>
  );
}

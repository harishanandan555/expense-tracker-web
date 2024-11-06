import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/user.services";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CurrencyComboBox } from "@/components/globals/currency-combo-box";
import Link from "next/link";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="wrapper flex flex-col items-center justify-center gap-4 h-screen">
      <div className="text-center space-y-1.5">
        <h1 className="text-4xl font-extrabold">Welcome, {user.name}! </h1>
        <p className="text-muted-foreground">
          Let&apos;s get started by setting up your currency.
        </p>
        <p className="text-muted-foreground">You can change it later!</p>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your default currency for transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Button className="w-full" asChild>
        <Link href="/upgrade">Done</Link>
      </Button>
    </main>
  );
}

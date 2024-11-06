"use client";

import { Logo } from "@/components/globals/logo";
import { UserButton } from "@/components/globals/user-button";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { UpgradeBanner } from "@/components/globals/upgrade-banner";
import { useStripe } from "@/hooks/use-stripe";

export const Header = () => {
  const { hasAccess, isLoading } = useStripe();

  return (
    <header className="sticky top-0 bg-background z-50">
      <div className="py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-x-10">
            <Logo />
            <Navigation />
          </div>
          <div className="flex items-center gap-x-2">
            <UserButton />
            <MobileNavigation />
          </div>
        </div>
      </div>
      {!isLoading && !hasAccess && <UpgradeBanner />}
    </header>
  );
};

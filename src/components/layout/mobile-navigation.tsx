"use client";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/globals/logo";
import { links } from "@/lib/links";
import { NavigationItem } from "./navigation-item";

export const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="space-y-8">
        <SheetHeader>
          <Logo width={60} height={60} />
        </SheetHeader>
        <div className="flex flex-col items-start gap-4">
          {links.map((link) => (
            <SheetClose key={link.href} asChild>
              <NavigationItem
                label={link.label}
                href={link.href}
                icon={link.icon}
              />
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export const UpgradeBanner = () => {
  return (
    <div className="w-full h-7 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-md text-primary-foreground text-center font-bold flex items-center justify-center">
      <span className="flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        <Link href="/upgrade">Upgrade to premium user</Link>
      </span>
    </div>
  );
};

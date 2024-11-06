"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
};

export const NavigationItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  className,
}: Props) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={false}
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-lg font-medium leading-tight hover:text-primary on-hover",
        isActive ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </Link>
  );
};

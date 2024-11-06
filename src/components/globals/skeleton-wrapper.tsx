"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
	isLoading: boolean;
	fullWidth?: boolean;
};

export const SkeletonWrapper = ({ children, isLoading, fullWidth }: Props) => {
	if (!isLoading) return children;

	return (
		<Skeleton className={cn(fullWidth && "w-full")}>
			<div className="opacity-0">{children}</div>
		</Skeleton>
	);
};

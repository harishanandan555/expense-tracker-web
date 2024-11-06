"use client";

import { links } from "@/lib/links";
import { NavigationItem } from "@/components/layout/navigation-item";

export const Navigation = () => {
	return (
		<div className="hidden md:flex items-center space-x-6">
			{links.map((link) => (
				<NavigationItem key={link.href} label={link.label} href={link.href} />
			))}
		</div>
	);
};

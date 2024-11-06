"use client";

import { signOut, useSession } from "next-auth/react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { LogOut, Moon, Sun } from "lucide-react";

export const UserButton = () => {
	const { data } = useSession();

	const { setTheme } = useTheme();

	const onLogout = () => {
		signOut({ callbackUrl: "/auth/sign-in" });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarImage
						src={String(data?.user?.image)}
						alt={String(data?.user?.name)}
					/>
					<AvatarFallback>{data?.user?.name}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-2">
				<DropdownMenuItem onClick={() => setTheme("light")} className="text-sm">
					<Sun className="mr-2 w-4 h-4" /> Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")} className="text-sm">
					<Moon className="mr-2 w-4 h-4" /> Dark
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onLogout} className="text-sm">
					<LogOut className="mr-2 w-4 h-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

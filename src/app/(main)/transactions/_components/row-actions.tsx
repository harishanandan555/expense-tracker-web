"use client";

import { useState } from "react";
import { MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetTransactionsHistoryType } from "@/app/api/transactions-history/route";
import { DeleteTransactionDialog } from "./delete-transaction-dialog";

type Props = {
	transaction: GetTransactionsHistoryType[0];
};

export const RowActions = ({ transaction }: Props) => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

	return (
		<>
			<DeleteTransactionDialog
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
				transactionId={transaction.id}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" variant="ghost">
						<span className="sr-only">Open Menu</span>
						<MoreHorizontal className="w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="flex items-center gap-2"
						onSelect={() => {
							setDeleteDialogOpen((prev) => !prev);
						}}
					>
						<Trash className="w-4 h-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

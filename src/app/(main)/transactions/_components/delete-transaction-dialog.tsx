"use client";

import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DeleteTransaction } from "@/actions/transaction.action";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	transactionId: string;
};

export const DeleteTransactionDialog = ({
	open,
	setOpen,
	transactionId,
}: Props) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: DeleteTransaction,
		onSuccess: async (data) => {
			toast.success(`${data.description} was deleted successfully!`, {
				id: transactionId,
			});

			await queryClient.invalidateQueries({
				queryKey: ["transactions"],
			});
		},
		onError: () => {
			toast.error("Something went wrong!", { id: transactionId });
		},
	});

	const onDelete = useCallback(() => {
		toast.loading("Deleting Transaction...", { id: transactionId });
		mutate(transactionId);
	}, [mutate, transactionId]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Transaction</AlertDialogTitle>
					<AlertDialogDescription>
						This transaction will be deleted permanently!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete} disabled={isPending}>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

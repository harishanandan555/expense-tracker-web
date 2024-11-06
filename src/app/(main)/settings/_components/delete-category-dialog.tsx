"use client";

import { useCallback } from "react";
import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteCategory } from "@/actions/categories.action";
import { TransactionType } from "@/lib/types";

type Props = {
	children: React.ReactNode;
	category: Category;
};

export const DeleteCategoryDialog = ({ children, category }: Props) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: DeleteCategory,
		onSuccess: async (data: Category) => {
			toast.success(`Category ${data.name} deleted successfully!`, {
				id: "delete-category",
			});

			await queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
		onError: () => {
			toast.error("Something went wrong", { id: "delete-category" });
		},
	});

	const onDelete = useCallback(() => {
		toast.loading("Deleting category...", { id: "delete-category" });

		mutate({ name: category.name, type: category.type as TransactionType });
	}, [mutate, category.name, category.type]);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Delete {category.icon} {category.name} category
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action can not be undo.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Confirm</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

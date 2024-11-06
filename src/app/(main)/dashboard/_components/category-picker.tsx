"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";

import { TransactionType } from "@/lib/types";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CategoryRow } from "./category-row";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { CreateCategoryDialog } from "./create-category-dialog";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	type: TransactionType;
	onChange: (value: string) => void;
};

export const CategoryPicker = ({ type, onChange }: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	const categoriesQuery = useQuery({
		queryKey: ["categories", type],
		queryFn: () =>
			fetch(`/api/categories?type=${type}`).then((res) => res.json()),
	});

	const selectedCategory = categoriesQuery.data?.find(
		(category: Category) => category.name === value,
	);

	const onSuccessCallback = useCallback(
		(category: Category) => {
			setValue(category.name);
		},
		[setValue],
	);

	useEffect(() => {
		if (!value) return;

		onChange(value);
	}, [value, onChange]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{selectedCategory ? (
						<CategoryRow category={selectedCategory} />
					) : (
						"Select a category."
					)}
					<ChevronsUpDown className="w-4 h-4 ml-2 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search category..." />
					<CreateCategoryDialog
						type={type}
						onSuccessCallback={onSuccessCallback}
					/>
					<Separator />
					<CommandEmpty>
						<p>Category Not Found!</p>
						<p className="text-xs text-muted-foreground">
							Tip: Create New Category
						</p>
					</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{categoriesQuery.data &&
								categoriesQuery.data.map((category: Category) => (
									<CommandItem
										key={category.id}
										onSelect={() => {
											setValue(category.name);
											setOpen((prev) => !prev);
										}}
									>
										<CategoryRow category={category} />
										<Check
											className={cn(
												"ml-2 w-4 h-4 opacity-0",
												category.name === value && "opacity-100",
											)}
										/>
									</CommandItem>
								))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

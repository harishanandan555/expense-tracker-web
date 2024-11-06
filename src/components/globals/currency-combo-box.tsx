"use client";

import { useCallback, useEffect, useState } from "react";
import { Settings } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { Currency, currencies } from "@/lib/currencies";
import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { UpdateUserCurrency } from "@/actions/settings.action";

export function CurrencyComboBox() {
	const [open, setOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<Currency | null>(null);

	const settings = useQuery<Settings>({
		queryKey: ["settings"],
		queryFn: () => fetch("/api/settings").then((res) => res.json()),
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: UpdateUserCurrency,
		onSuccess: async (data: Settings) => {
			toast.success("Currency updated successfully!", {
				id: "update-currency",
			});

			await queryClient.invalidateQueries({
				queryKey: ["overview"],
			});

			setSelectedOption(
				currencies.find((c) => c.value === data.currency) || null,
			);
		},
		onError: (e) => {
			toast.error("Something went wrong!");
		},
	});

	const isDesktop = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		if (!settings.data) return;

		const currency = currencies.find(
			(currency) => currency.value === settings.data.currency,
		);

		if (currency) setSelectedOption(currency);
	}, [settings.data]);

	const onSelectOption = useCallback(
		(currency: Currency | null) => {
			if (!currency) {
				toast.error("Please select currency!");

				return;
			}

			toast.loading("Updating Currency...", {
				id: "update-currency",
			});

			mutation.mutate(currency.value);
		},
		[mutation],
	);

	if (isDesktop) {
		return (
			<SkeletonWrapper isLoading={settings.isFetching}>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-start"
							disabled={mutation.isPending}
						>
							{selectedOption ? <>{selectedOption.label}</> : <>Set Currency</>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0" align="start">
						<OptionList setOpen={setOpen} setSelectedOption={onSelectOption} />
					</PopoverContent>
				</Popover>
			</SkeletonWrapper>
		);
	}

	return (
		<SkeletonWrapper isLoading={settings.isFetching}>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-start"
						disabled={mutation.isPending}
					>
						{selectedOption ? <>{selectedOption.label}</> : <>Set Currency</>}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mt-4 border-t">
						<OptionList setOpen={setOpen} setSelectedOption={onSelectOption} />
					</div>
				</DrawerContent>
			</Drawer>
		</SkeletonWrapper>
	);
}

function OptionList({
	setOpen,
	setSelectedOption,
}: {
	setOpen: (open: boolean) => void;
	setSelectedOption: (status: Currency | null) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder="Filter currency..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{currencies.map((currency: Currency) => (
						<CommandItem
							key={currency.value}
							value={currency.value}
							onSelect={(value) => {
								setSelectedOption(
									currencies.find((priority) => priority.value === value) ||
										null,
								);
								setOpen(false);
							}}
						>
							{currency.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

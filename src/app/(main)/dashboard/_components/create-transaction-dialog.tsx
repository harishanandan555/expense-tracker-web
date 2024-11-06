// "use client";

// import { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { CalendarIcon, Loader2 } from "lucide-react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { TransactionType } from "@/lib/types";
// import { cn } from "@/lib/utils";
// import {
// 	CreateTransactionSchema,
// 	CreateTransactionSchemaType,
// } from "@/schemas/transaction.schema";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { CategoryPicker } from "./category-picker";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { CreateTransaction } from "@/actions/transaction.action";
// import { DateToUTCDate } from "@/lib/helpers";

// type Props = {
// 	children: React.ReactNode;
// 	type: TransactionType;
// };

// export const CreateTransactionDialog = ({ children, type }: Props) => {
// 	const [open, setOpen] = useState(false);

// 	const form = useForm<CreateTransactionSchemaType>({
// 		resolver: zodResolver(CreateTransactionSchema),
// 		defaultValues: {
// 			type,
// 			date: new Date(),
// 		},
// 	});

// 	const queryClient = useQueryClient();

// 	const { mutate, isPending } = useMutation({
// 		mutationFn: CreateTransaction,
// 		onSuccess: () => {
// 			toast.success("Transaction Created!", { id: "create-transaction" });

// 			form.reset({
// 				type,
// 				description: "",
// 				date: new Date(),
// 				category: undefined,
// 				amount: 0,
// 			});

// 			queryClient.invalidateQueries({
// 				queryKey: ["overview"],
// 			});

// 			setOpen((prev) => !prev);
// 		},
// 	});

// 	const handleCategoryChange = useCallback(
// 		(value: string) => {
// 			form.setValue("category", value);
// 		},
// 		[form],
// 	);

// 	const onSubmit = useCallback(
// 		(values: CreateTransactionSchemaType) => {
// 			toast.loading("Creating Transaction...", { id: "create-transaction" });

// 			mutate({
// 				...values,
// 				date: DateToUTCDate(values.date),
// 			});
// 		},
// 		[mutate],
// 	);

// 	return (
// 		<Dialog open={open} onOpenChange={setOpen}>
// 			<DialogTrigger asChild>{children}</DialogTrigger>
// 			<DialogContent>
// 				<DialogHeader>
// 					<DialogTitle>
// 						Add New{" "}
// 						<span
// 							className={cn(
// 								type === "income" ? "text-emerald-700" : "text-rose-700",
// 								"capitalize",
// 							)}
// 						>
// 							{type}
// 						</span>{" "}
// 						Transaction.
// 					</DialogTitle>
// 				</DialogHeader>
// 				<Form {...form}>
// 					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
// 						<FormField
// 							control={form.control}
// 							name="description"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Transaction Description</FormLabel>
// 									<FormControl>
// 										<Input {...field} placeholder="Your description..." />
// 									</FormControl>
// 									<FormDescription>
// 										Transaction Description (Optional)
// 									</FormDescription>
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="amount"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Transaction Amount</FormLabel>
// 									<FormControl>
// 										<Input
// 											{...field}
// 											type="number"
// 											placeholder="Put the price"
// 										/>
// 									</FormControl>
// 									<FormDescription>
// 										Transaction Amount (Required)
// 									</FormDescription>
// 								</FormItem>
// 							)}
// 						/>
// 						<div className="grid grid-cols-2 gap-2">
// 							<FormField
// 								control={form.control}
// 								name="category"
// 								render={() => (
// 									<FormItem>
// 										<FormLabel>Category</FormLabel>
// 										<FormControl>
// 											<CategoryPicker
// 												type={type}
// 												onChange={handleCategoryChange}
// 											/>
// 										</FormControl>
// 										<FormDescription>
// 											Select a category for the transaction
// 										</FormDescription>
// 									</FormItem>
// 								)}
// 							/>
// 							<FormField
// 								control={form.control}
// 								name="date"
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>Transaction date</FormLabel>
// 										<Popover>
// 											<PopoverTrigger asChild>
// 												<Button
// 													variant="outline"
// 													className={cn(
// 														"font-normal text-left pl-3 w-full",
// 														!field.value && "text-muted-foreground",
// 													)}
// 												>
// 													{field.value ? (
// 														format(field.value, "PPP")
// 													) : (
// 														<span>Pick a date</span>
// 													)}
// 													<CalendarIcon className="opacity-50 w-4 h-4 ml-auto" />
// 												</Button>
// 											</PopoverTrigger>
// 											<PopoverContent className="w-auto p-0">
// 												<Calendar
// 													mode="single"
// 													selected={field.value}
// 													onSelect={(value) => {
// 														if (!value) return;
// 														field.onChange(value);
// 													}}
// 													initialFocus
// 												/>
// 											</PopoverContent>
// 										</Popover>
// 										<FormDescription>
// 											Select a date for your transaction
// 										</FormDescription>
// 										<FormMessage />
// 									</FormItem>
// 								)}
// 							/>
// 						</div>
// 						<DialogFooter className="flex items-center gap-2 w-full">
// 							<DialogClose asChild>
// 								<Button type="submit" variant="secondary" className="w-full">
// 									Cancel
// 								</Button>
// 							</DialogClose>
// 							<Button
// 								className="w-full"
// 								type="submit"
// 								disabled={isPending || !form.formState.isValid}
// 							>
// 								{isPending ? <Loader2 className="animate-spin" /> : "Save"}
// 							</Button>
// 						</DialogFooter>
// 					</form>
// 				</Form>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };


//===========================================================================================================

"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
	CreateTransactionSchema,
	CreateTransactionSchemaType,
} from "@/schemas/transaction.schema";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryPicker } from "./category-picker";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CreateTransaction } from "@/actions/transaction.action";
import { DateToUTCDate } from "@/lib/helpers";

type Props = {
	children: React.ReactNode;
	type: TransactionType;
};

export const CreateTransactionDialog = ({ children, type }: Props) => {
	
	const [open, setOpen] = useState(false);

	const form = useForm<CreateTransactionSchemaType>({
		resolver: zodResolver(CreateTransactionSchema),
		defaultValues: {
			type,
			date: new Date(),
		},
	});

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: CreateTransaction,
		onSuccess: () => {
			toast.success("Transaction Created!", { id: "create-transaction" });

			form.reset({
				type,
				description: "",
				date: new Date(),
				category: undefined,
				amount: 0,
			});

			queryClient.invalidateQueries({
				queryKey: ["overview"],
			});

			setOpen((prev) => !prev);
		},
	});

	const handleCategoryChange = useCallback(
		(value: string) => {
			form.setValue("category", value);
		},
		[form],
	);

	const onSubmit = useCallback(
		(values: CreateTransactionSchemaType) => {
			toast.loading("Creating Transaction...", { id: "create-transaction" });

			mutate({
				...values,
				date: DateToUTCDate(values.date),
			});
		},
		[mutate],
	);

	// const onSubmit = useCallback(
	// 	(values: CreateTransactionSchemaType) => {
	// 		toast.loading("Creating Transaction...", { id: "create-transaction" });

	// 		mutate({
	// 			...values,
	// 			date: values.date ? DateToUTCDate(values.date) : DateToUTCDate(new Date()), // Default to current date if not provided
	// 		});
	// 	},
	// 	[mutate],
	// );

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Add New{" "}
						<span
							className={cn(
								type === "income" ? "text-emerald-700" : "text-rose-700",
								"capitalize",
							)}
						>
							{type}
						</span>{" "}
						Transaction.
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Transaction Description</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Your description..." />
									</FormControl>
									<FormDescription>
										Transaction Description (Optional)
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Transaction Amount</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											placeholder="Put the price"
										/>
									</FormControl>
									<FormDescription>
										Transaction Amount (Required)
									</FormDescription>
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-2">
							<FormField
								control={form.control}
								name="category"
								render={() => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<CategoryPicker
												type={type}
												onChange={handleCategoryChange}
											/>
										</FormControl>
										<FormDescription>
											Select a category for the transaction
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => {
									// State to manage the open/close behavior of the popover
									const [calendarOpen, setCalendarOpen] = useState(false);

									return (
										<FormItem>
											<FormLabel>Transaction date</FormLabel>
											<Popover
												open={calendarOpen}
												onOpenChange={setCalendarOpen}
											>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														className={cn(
															"font-normal text-left pl-3 w-full",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="opacity-50 w-4 h-4 ml-auto" />
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={(value) => {
															field.onChange(value);
															// Close the calendar after a date is selected (same or different)
															setCalendarOpen(false);
														}}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormDescription>
												Select a date for your transaction
											</FormDescription>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						</div>
						<DialogFooter className="flex items-center gap-2 w-full">
							<DialogClose asChild>
								<Button type="submit" variant="secondary" className="w-full">
									Cancel
								</Button>
							</DialogClose>
							<Button
								className="w-full"
								type="submit"
								disabled={isPending || !form.formState.isValid}
							>
								{isPending ? <Loader2 className="animate-spin" /> : "Save"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};



//trastion date
//===============================================================================================================\
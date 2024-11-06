// "use client";

// import { CircleOff, Loader2, Plus } from "lucide-react";
// import { useCallback, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Category } from "@prisma/client";
// import { toast } from "sonner";
// import { useTheme } from "next-themes";

// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { TransactionType } from "@/lib/types";
// import {
// 	CreateCategorySchema,
// 	CreateCategorySchemaType,
// } from "@/schemas/categories.schema";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
// 	Form,
// 	FormItem,
// 	FormLabel,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import { CreateCategory } from "@/actions/categories.action";

// type Props = {
// 	type: TransactionType;
// 	onSuccessCallback: (category: Category) => void;
// };

// export const CreateCategoryDialog = ({ type, onSuccessCallback }: Props) => {
// 	const [open, setOpen] = useState<boolean>(false);
// 	const form = useForm<CreateCategorySchemaType>({
// 		resolver: zodResolver(CreateCategorySchema),
// 		defaultValues: {
// 			type,
// 		},
// 	});

// 	const theme = useTheme();

// 	const queryClient = useQueryClient();

// 	const { mutate, isPending } = useMutation({
// 		mutationFn: CreateCategory,
// 		onSuccess: async (data: Category) => {
// 			form.reset({
// 				name: "",
// 				icon: "",
// 				type,
// 			});

// 			toast.success(`Category ${data.name} created successfully!`, {
// 				id: "create-category",
// 			});

// 			onSuccessCallback(data);

// 			await queryClient.invalidateQueries({
// 				queryKey: ["categories"],
// 			});

// 			setOpen((prev) => !prev);
// 		},
// 		onError: () => {
// 			toast.error("Something went wrong", { id: "create-category" });
// 		},
// 	});

// 	const onSubmit = useCallback(
// 		(values: CreateCategorySchemaType) => {
// 			toast.loading("Creating Category...", {
// 				id: "create-category",
// 			});

// 			mutate(values);
// 		},
// 		[mutate],
// 	);

// 	return (
// 		<Dialog open={open} onOpenChange={setOpen}>
// 			<DialogTrigger asChild>
// 				<Button variant="ghost" className="flex items-center justify-start">
// 					<Plus className="mr-2 w-4 h-4" />
// 					Create New
// 				</Button>
// 			</DialogTrigger>
// 			<DialogContent>
// 				<DialogHeader>
// 					<DialogTitle>
// 						Create{" "}
// 						<span
// 							className={cn(
// 								"capitalize",
// 								type === "income" ? "text-emerald-700" : "text-rose-700",
// 							)}
// 						>
// 							{type}
// 						</span>{" "}
// 						category
// 					</DialogTitle>
// 					<DialogDescription>
// 						Categories are used to group your transactions.
// 					</DialogDescription>
// 				</DialogHeader>
// 				<Form {...form}>
// 					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
// 						<FormField
// 							control={form.control}
// 							name="name"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Name</FormLabel>
// 									<FormControl>
// 										<Input {...field} placeholder="Category" />
// 									</FormControl>
// 									<FormDescription>
// 										This is how your category will appear
// 									</FormDescription>
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="icon"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Icon</FormLabel>
// 									<FormControl>
// 										<Popover>
// 											<PopoverTrigger asChild>
// 												<Button variant="outline" className="h-[100px] w-full">
// 													{form.watch("icon") ? (
// 														<div className="flex flex-col items-center gap-2">
// 															<span className="text-5xl" role="img">
// 																{field.value}
// 															</span>
// 															<p className="text-center">
// 																Click To Select Icon
// 															</p>
// 														</div>
// 													) : (
// 														<div className="flex flex-col items-center gap-2">
// 															<CircleOff className="w-[48px] h-[48px]" />
// 															<p className="text-center">
// 																Click To Select Icon
// 															</p>
// 														</div>
// 													)}
// 												</Button>
// 											</PopoverTrigger>
// 											<PopoverContent
// 												dir="center"
// 												side="center"
// 												className="w-full p-0"
// 											>
// 												<Picker
// 													data={data}
// 													maxFrequentRows={3}
// 													theme={theme.resolvedTheme}
// 													onEmojiSelect={(emoji: { native: string }) =>
// 														field.onChange(emoji.native)
// 													}
// 												/>
// 											</PopoverContent>
// 										</Popover>
// 									</FormControl>
// 									<FormDescription>
// 										This Icon will appear in the category .
// 									</FormDescription>
// 								</FormItem>
// 							)}
// 						/>
// 						<DialogFooter className="flex items-center gap-2 w-full">
// 							<DialogClose asChild>
// 								<Button variant="secondary" className="w-full">
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





"use client";

import { CircleOff, Loader2, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { useTheme } from "next-themes";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import {
    CreateCategorySchema,
    CreateCategorySchemaType,
} from "@/schemas/categories.schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CreateCategory } from "@/actions/categories.action";

type Props = {
    type: TransactionType;
    onSuccessCallback: (category: Category) => void;
};

export const CreateCategoryDialog = ({ type, onSuccessCallback }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);  // Separate state for emoji picker
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type,
        },
    });

    const theme = useTheme();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: async (data: Category) => {
            form.reset({
                name: "",
                icon: "",
                type,
            });

            toast.success(`Category ${data.name} created successfully!`, {
                id: "create-category",
            });

            onSuccessCallback(data);

            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            });

            setOpen(false);  // Close the entire dialog after success
        },
        onError: () => {
            toast.error("Something went wrong", { id: "create-category" });
        },
    });

    const onSubmit = useCallback(
        (values: CreateCategorySchemaType) => {
            toast.loading("Creating Category...", {
                id: "create-category",
            });

            mutate(values);
        },
        [mutate],
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center justify-start">
                    <Plus className="mr-2 w-4 h-4" />
                    Create New
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create{" "}
                        <span
                            className={cn(
                                "capitalize",
                                type === "income" ? "text-emerald-700" : "text-rose-700",
                            )}
                        >
                            {type}
                        </span>{" "}
                        category
                    </DialogTitle>
                    <DialogDescription>
                        Categories are used to group your transactions.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Category" />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="h-[100px] w-full">
                                                    {form.watch("icon") ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <span className="text-5xl" role="img">
                                                                {field.value}
                                                            </span>
                                                            <p className="text-center">
                                                                Click To Select Icon
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <CircleOff className="w-[48px] h-[48px]" />
                                                            <p className="text-center">
                                                                Click To Select Icon
                                                            </p>
                                                        </div>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                dir="center"
                                                side="center"
                                                className="w-full p-0"
                                            >
                                                <Picker
                                                    data={data}
                                                    maxFrequentRows={3}
                                                    theme={theme.resolvedTheme}
                                                    onEmojiSelect={(emoji: { native: string }) => {
                                                        field.onChange(emoji.native);
                                                        setIsEmojiPickerOpen(false);  // Close only the emoji picker
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription>
                                        This Icon will appear in the category.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex items-center gap-2 w-full">
                            <DialogClose asChild>
                                <Button variant="secondary" className="w-full">
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

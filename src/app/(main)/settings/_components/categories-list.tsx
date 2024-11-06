// "use client";

// import { Category } from "@prisma/client";
// import { useQuery } from "@tanstack/react-query";
// import { TrendingDown, TrendingUp } from "lucide-react";

// import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { TransactionType } from "@/lib/types";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { CategoryCard } from "./category-card";
// import { CreateCategoryDialog } from "../../dashboard/_components/create-category-dialog";

// type Props = {
// 	type: TransactionType;
// };

// export const CategoriesList = ({ type }: Props) => {
// 	const categoriesQuery = useQuery<Category[]>({
// 		queryKey: ["categories", type],
// 		queryFn: () =>
// 			fetch(`/api/categories?type=${type}`).then((res) => res.json()),
// 	});

// 	const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

// 	return (
// 		<SkeletonWrapper isLoading={categoriesQuery.isLoading} fullWidth>
// 			<Card>
// 				<CardHeader>
// 					<CardTitle className="flex items-center justify-between gap-2">
// 						<div className="flex items-center gap-2">
// 							{type === "expense" ? (
// 								<TrendingDown className="w-12 h-12 items-center rounded-lg bg-rose-600/10 p-2 text-rose-600" />
// 							) : (
// 								<TrendingUp className="w-12 h-12 items-center rounded-lg bg-emerald-600/10 p-2 text-emerald-600" />
// 							)}
// 							<div>
// 								{type === "expense" ? "Expense" : "Income"} Categories
// 								<div className="text-sm text-muted-foreground">
// 									Sorted by name
// 								</div>
// 							</div>
// 						</div>
// 						<CreateCategoryDialog
// 							type={type}
// 							onSuccessCallback={() => categoriesQuery.refetch()}
// 						/>
// 					</CardTitle>
// 				</CardHeader>
// 				<Separator />
// 				{!dataAvailable && (
// 					<div className="flex flex-col items-center justify-center h-40 w-full">
// 						<p>
// 							No
// 							<span
// 								className={cn(
// 									"m-1",
// 									type === "expense" ? "text-rose-600" : "text-emerald-600",
// 								)}
// 							>
// 								{type}
// 							</span>{" "}
// 							categories yet
// 						</p>
// 						<p className="text-sm text-muted-foreground">
// 							Create category to get started!
// 						</p>
// 					</div>
// 				)}
// 				{dataAvailable && (
// 					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
// 						{categoriesQuery.data.map((category) => (
// 							<CategoryCard key={category.id} category={category} />
// 						))}
// 					</div>
// 				)}
// 			</Card>
// 		</SkeletonWrapper>
// 	);
// };



"use client";

import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp } from "lucide-react";

import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionType } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CategoryCard } from "./category-card";
import { CreateCategoryDialog } from "../../dashboard/_components/create-category-dialog";

type Props = {
	type: TransactionType;
};

export const CategoriesList = ({ type }: Props) => {
	const categoriesQuery = useQuery<Array<Category & { isDefault: boolean }>>({
		queryKey: ["categories", type],
		queryFn: () =>
			fetch(`/api/categories?type=${type}`).then((res) => res.json()),
	});

	const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

	return (
		<SkeletonWrapper isLoading={categoriesQuery.isLoading} fullWidth>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							{type === "expense" ? (
								<TrendingDown className="w-12 h-12 items-center rounded-lg bg-rose-600/10 p-2 text-rose-600" />
							) : (
								<TrendingUp className="w-12 h-12 items-center rounded-lg bg-emerald-600/10 p-2 text-emerald-600" />
							)}
							<div>
								{type === "expense" ? "Expense" : "Income"} Categories
								<div className="text-sm text-muted-foreground">
									Sorted by name
								</div>
							</div>
						</div>
						<CreateCategoryDialog
							type={type}
							onSuccessCallback={() => categoriesQuery.refetch()}
						/>
					</CardTitle>
				</CardHeader>
				<Separator />
				{!dataAvailable && (
					<div className="flex flex-col items-center justify-center h-40 w-full">
						<p>
							No
							<span
								className={cn(
									"m-1",
									type === "expense" ? "text-rose-600" : "text-emerald-600",
								)}
							>
								{type}
							</span>{" "}
							categories yet
						</p>
						<p className="text-sm text-muted-foreground">
							Create category to get started!
						</p>
					</div>
				)}
				{dataAvailable && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
						{categoriesQuery.data.map((category) => (
							<CategoryCard 
								key={category.id} 
								category={category} 
								isDefault={category.isDefault} 
							/>
						))}
					</div>
				)}
			</Card>
		</SkeletonWrapper>
	);
};

// "use client";

// import { GetCategoriesStatusResponseType } from "@/app/api/status/categories/route";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { TransactionType } from "@/lib/types";
// import { useMemo } from "react";

// type Props = {
// 	formatter: Intl.NumberFormat;
// 	type: TransactionType;
// 	data: GetCategoriesStatusResponseType;
// };

// export const CategoryStatusCard = ({ formatter, type, data }: Props) => {
// 	const filterdData = data.filter((el) => el.type === type);
// 	const total = useMemo(
// 		() => data.reduce((acc, curr) => acc + (curr?._sum.amount || 0), 0),
// 		[data],
// 	);

// 	return (
// 		<Card className="h-80 w-full col-span-6">
// 			<CardHeader>
// 				<CardTitle className="flex flex-row md:flex-col items-center justify-between gap-2">
// 					{type === "income" ? "Income" : "Expense"}
// 				</CardTitle>
// 			</CardHeader>
// 			<div className="flex items-center justify-between gap-2">
// 				{filterdData.length === 0 && (
// 					<div className="flex h-60 w-full flex-col items-center justify-center text-center">
// 						No data for the selected period.
// 						<p className="text-sm text-muted-foreground">
// 							Try to select different period or adding{" "}
// 							{type === "income" ? "incomes" : "expenses"}
// 						</p>
// 					</div>
// 				)}
// 				{filterdData.length > 0 && (
// 					<ScrollArea className="h-60 w-full px-4">
// 						<div className="flex flex-col w-full gap-4 p-4">
// 							{filterdData.map((item, index) => {
// 								const amount = item._sum.amount || 0;
// 								const percentage = (amount * 100) / (total || amount);

// 								return (
// 									<div key={index} className="flex flex-col gap-2">
// 										<div className="flex items-center justify-between">
// 											<span className="flex items-center text-gray-400">
// 												{item.categoryIcon} {item.category}
// 												<span className="ml-2 text-xs text-muted-foreground">
// 													({percentage.toFixed(0)}%)
// 												</span>
// 											</span>
// 											<span className="text-sm text-muted-foreground">
// 												{formatter.format(amount)}
// 											</span>
// 										</div>
// 										<Progress
// 											value={percentage}
// 											indicator={
// 												type === "income" ? "bg-emerald-600" : "bg-rose-600"
// 											}
// 										/>
// 									</div>
// 								);
// 							})}
// 						</div>
// 					</ScrollArea>
// 				)}
// 			</div>
// 		</Card>
// 	);
// };




"use client";

import { GetCategoriesStatusResponseType } from "@/app/api/status/categories/route";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionType } from "@/lib/types";
import { useMemo } from "react";

type Props = {
	formatter: Intl.NumberFormat;
	type: TransactionType;
	data: GetCategoriesStatusResponseType;
};

export const CategoryStatusCard = ({ formatter, type, data }: Props) => {
	// Filter data based on transaction type (income or expense)
	const filteredData = data.filter((el) => el.type === type);

	// Calculate the total sum of amounts
	const total = useMemo(
		() => data.reduce((acc, curr) => acc + (curr?.sumAmount || 0), 0), // Use `sumAmount` instead of `_sum.amount`
		[data],
	);

	return (
		<Card className="h-80 w-full col-span-6">
			<CardHeader>
				<CardTitle className="flex flex-row md:flex-col items-center justify-between gap-2">
					{type === "income" ? "Income" : "Expense"}
				</CardTitle>
			</CardHeader>
			<div className="flex items-center justify-between gap-2">
				{filteredData.length === 0 && (
					<div className="flex h-60 w-full flex-col items-center justify-center text-center">
						No data for the selected period.
						<p className="text-sm text-muted-foreground">
							Try to select different period or adding{" "}
							{type === "income" ? "incomes" : "expenses"}
						</p>
					</div>
				)}
				{filteredData.length > 0 && (
					<ScrollArea className="h-60 w-full px-4">
						<div className="flex flex-col w-full gap-4 p-4">
							{filteredData.map((item, index) => {
								const amount = item.sumAmount || 0; // Use `sumAmount` instead of `_sum.amount`
								const percentage = (amount * 100) / (total || amount);

								return (
									<div key={index} className="flex flex-col gap-2">
										<div className="flex items-center justify-between">
											<span className="flex items-center text-gray-400">
												{item.categoryIcon} {item.category}
												<span className="ml-2 text-xs text-muted-foreground">
													({percentage.toFixed(0)}%)
												</span>
											</span>
											<span className="text-sm text-muted-foreground">
												{formatter.format(amount)}
											</span>
										</div>
										<Progress
											value={percentage}
											indicator={
												type === "income" ? "bg-emerald-600" : "bg-rose-600"
											}
										/>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				)}
			</div>
		</Card>
	);
};

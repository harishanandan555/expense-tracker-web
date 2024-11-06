// import { redirect } from "next/navigation";

// import { OverviewQuerySchema } from "@/schemas/overview.schema";
// import { getCurrentUser } from "@/services/user.services";
// import { db } from "@/lib/db";

// export async function GET(request: Request) {
// 	const user = await getCurrentUser();

// 	if (!user) {
// 		return redirect("/auth/sign-in");
// 	}

// 	const { searchParams } = new URL(request.url);
// 	const from = searchParams.get("from");
// 	const to = searchParams.get("to");

// 	const queryParams = OverviewQuerySchema.safeParse({ from, to });

// 	if (!queryParams.success) {
// 		throw new Error(queryParams.error.message);
// 	}

// 	const status = await getCategoriesStatus(
// 		user.id,
// 		queryParams.data.from,
// 		queryParams.data.to,
// 	);

// 	return Response.json(status);
// }

// export type GetCategoriesStatusResponseType = Awaited<
// 	ReturnType<typeof getCategoriesStatus>
// >;

// async function getCategoriesStatus(userId: string, from: Date, to: Date) {
// 	const status = await db.transaction.groupBy({
// 		by: ["type", "category", "categoryIcon"],
// 		where: {
// 			userId,
// 			date: {
// 				gte: from,
// 				lte: to,
// 			},
// 		},
// 		_sum: {
// 			amount: true,
// 		},
// 		orderBy: {
// 			_sum: {
// 				amount: "desc",
// 			},
// 		},
// 	});

// 	return status;
// }


import { redirect } from "next/navigation";

import { OverviewQuerySchema } from "@/schemas/overview.schema";
import { getCurrentUser } from "@/services/user.services";
import { getTransactionsByUserIdAndDate } from "@/services/firebaseSettings"; // Import Firestore function

export async function GET(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth/sign-in");
	}

	const { searchParams } = new URL(request.url);
	const from = searchParams.get("from");
	const to = searchParams.get("to");

	const queryParams = OverviewQuerySchema.safeParse({ from, to });

	if (!queryParams.success) {
		throw new Error(queryParams.error.message);
	}

	const status = await getCategoriesStatus(
		user.id,
		new Date(queryParams.data.from), // Convert from string to Date
		new Date(queryParams.data.to) // Convert from string to Date
	);

	return Response.json(status);
}

export type GetCategoriesStatusResponseType = Awaited<
	ReturnType<typeof getCategoriesStatus>
>;

async function getCategoriesStatus(userId: string, from: Date, to: Date) {
	// Fetch transactions from Firestore
	const transactions = await getTransactionsByUserIdAndDate(userId, from, to);

	// Aggregate the data manually
	const aggregatedData: {
		[type: string]: {
			[category: string]: {
				categoryIcon: string;
				sumAmount: number;
			};
		};
	} = {};

	transactions.forEach((transaction) => {
		const { type, category, categoryIcon, amount } = transaction;

		if (!aggregatedData[type]) {
			aggregatedData[type] = {};
		}

		if (!aggregatedData[type][category]) {
			aggregatedData[type][category] = { categoryIcon, sumAmount: 0 };
		}

		// Sum the amount for each category under each type
		aggregatedData[type][category].sumAmount += amount;
	});

	// Convert the aggregated data into an array (optional based on your response needs)
	const result = Object.entries(aggregatedData).flatMap(([type, categories]) =>
		Object.entries(categories).map(([category, data]) => ({
			type,
			category,
			categoryIcon: data.categoryIcon,
			sumAmount: data.sumAmount,
		}))
	);

	// Sort the result by sumAmount in descending order
	result.sort((a, b) => b.sumAmount - a.sumAmount);

	return result;
}

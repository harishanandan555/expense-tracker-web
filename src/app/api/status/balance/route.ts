// import { redirect } from "next/navigation";

// import { getCurrentUser } from "@/services/user.services";
// import { OverviewQuerySchema } from "@/schemas/overview.schema";
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
// 		return Response.json(queryParams.error.message, {
// 			status: 400,
// 		});
// 	}

// 	const status = await getBalanceStatus(
// 		user.id,
// 		queryParams.data.from,
// 		queryParams.data.to,
// 	);

// 	return Response.json(status);
// }

// export type GetBalanceStatusResponseType = Awaited<
// 	ReturnType<typeof getBalanceStatus>
// >;

// async function getBalanceStatus(userId: string, from: Date, to: Date) {
// 	const total = await db.transaction.groupBy({
// 		by: ["type"],
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
// 	});

// 	return {
// 		expense: total.find((t) => t.type === "expense")?._sum.amount || 0,
// 		income: total.find((t) => t.type === "income")?._sum.amount || 0,
// 	};
// }





import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/user.services";
import { OverviewQuerySchema } from "@/schemas/overview.schema";
import { getTransactionsByUserIdAndDate } from "@/services/firebaseSettings"; // Firestore helper function

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
		return Response.json(queryParams.error.message, {
			status: 400,
		});
	}

	const status = await getBalanceStatus(
		user.id,
		new Date(queryParams.data.from), // Convert from string to Date
		new Date(queryParams.data.to), // Convert from string to Date
	);

	return Response.json(status);
}

export type GetBalanceStatusResponseType = Awaited<
	ReturnType<typeof getBalanceStatus>
>;

async function getBalanceStatus(userId: string, from: Date, to: Date) {
	// Fetch transactions from Firestore
	const transactions = await getTransactionsByUserIdAndDate(userId, from, to);

	// Initialize totals for income and expense
	let income = 0;
	let expense = 0;

	// Loop through transactions and sum amounts by type
	transactions.forEach((transaction) => {
		if (transaction.type === "income") {
			income += transaction.amount;
		} else if (transaction.type === "expense") {
			expense += transaction.amount;
		}
	});

	// Return the calculated totals
	return {
		income,
		expense,
	};
}

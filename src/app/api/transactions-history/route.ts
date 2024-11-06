// import { redirect } from "next/navigation";

// import { getCurrentUser } from "@/services/user.services";
// import { OverviewQuerySchema } from "@/schemas/overview.schema";
// import { db } from "@/lib/db";
// import { CurrencyFormatter } from "@/lib/helpers";

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
// 		return Response.json(queryParams.error.message, { status: 400 });
// 	}

// 	const transactions = await getTransactionsHistory(
// 		user.id,
// 		queryParams.data.from,
// 		queryParams.data.to,
// 	);

// 	return Response.json(transactions);
// }

// export type GetTransactionsHistoryType = Awaited<
// 	ReturnType<typeof getTransactionsHistory>
// >;

// async function getTransactionsHistory(userId: string, from: Date, to: Date) {
// 	const settings = await db.settings.findUnique({
// 		where: {
// 			userId,
// 		},
// 	});

// 	if (!settings) {
// 		throw new Error("User settings not found!");
// 	}

// 	const formatter = CurrencyFormatter(settings.currency);

// 	const transactions = await db.transaction.findMany({
// 		where: {
// 			userId,
// 			date: {
// 				gte: from,
// 				lte: to,
// 			},
// 		},
// 		orderBy: {
// 			date: "desc",
// 		},
// 	});

// 	return transactions.map((transaction) => ({
// 		...transaction,
// 		formattedAmount: formatter.format(transaction.amount),
// 	}));
// }


//================================================================================main

// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/services/user.services";
// import { OverviewQuerySchema } from "@/schemas/overview.schema";
// import { db } from "@/lib/db";
// import { getTransactionsByUserIdAndDate } from "@/services/firebaseSettings";
// import { CurrencyFormatter } from "@/lib/helpers";

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
// 		return Response.json(queryParams.error.message, { status: 400 });
// 	}

// 	const transactions = await getTransactionsHistory(
// 		user.id,
// 		new Date(queryParams.data.from),
// 		new Date(queryParams.data.to)
// 	);

// 	return Response.json(transactions);
// }

// export type GetTransactionsHistoryType = Awaited<
// 	ReturnType<typeof getTransactionsHistory>
// >;

// async function getTransactionsHistory(userId: string, from: Date, to: Date) {

// 	const settings = await db.settings.findUnique({
// 		where: {
// 			userId,
// 		},
// 	});

// 	if (!settings) {
// 		throw new Error("User settings not found!");
// 	}

// 	const formatter = CurrencyFormatter(settings.currency);

// 	const transactions = await getTransactionsByUserIdAndDate(userId, from, to);

// 	return transactions.map((transaction) => ({
// 		...transaction,
// 		formattedAmount: formatter.format(transaction.amount),
// 	}));
	
// }


//===============================================================================


import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/user.services";
import { OverviewQuerySchema } from "@/schemas/overview.schema";
import { getTransactionsByUserIdAndDate, getSettingsByUserId } from "@/services/firebaseSettings";
import { CurrencyFormatter } from "@/lib/helpers";

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
    return Response.json(queryParams.error.message, { status: 400 });
  }

  const transactions = await getTransactionsHistory(
    user.id,
    new Date(queryParams.data.from),
    new Date(queryParams.data.to)
  );

  return Response.json(transactions);
}

export type GetTransactionsHistoryType = Awaited<
  ReturnType<typeof getTransactionsHistory>
>;

async function getTransactionsHistory(userId: string, from: Date, to: Date) {
  const settings = await getSettingsByUserId(userId);

  if (!settings) {
    throw new Error("User settings not found!");
  }

  const formatter = CurrencyFormatter(settings.currency);

  const transactions = await getTransactionsByUserIdAndDate(userId, from, to);

  return transactions.map((transaction) => ({
    ...transaction,
    formattedAmount: formatter.format(transaction.amount),
  }));
}

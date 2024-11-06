import { redirect } from "next/navigation";
import { getDaysInMonth } from "date-fns";

import { Period, TimeFrame } from "@/lib/types";
import { GetHistoryDataSchema } from "@/schemas/history.schema";
import { getCurrentUser } from "@/services/user.services";
import { db } from "@/lib/db";

export async function GET(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth/sign-in");
	}

	const { searchParams } = new URL(request.url);

	const timeframe = searchParams.get("timeframe");
	const month = searchParams.get("month");
	const year = searchParams.get("year");

	const queryParams = GetHistoryDataSchema.safeParse({
		timeframe,
		month,
		year,
	});

	if (!queryParams.success) {
		return Response.json(queryParams.error.message, { status: 400 });
	}

	const data = await getHistoryData(user.id, queryParams.data.timeframe, {
		month: queryParams.data.month,
		year: queryParams.data.year,
	});

	return Response.json(data);
}

export type GetHistoryDataType = Awaited<ReturnType<typeof getHistoryData>>;

async function getHistoryData(
	userId: string,
	timeframe: TimeFrame,
	period: Period,
) {
	switch (timeframe) {
		case "month":
			return await getMonthHistoryData(userId, period.year, period.month);
		case "year":
			return await getYearHistoryData(userId, period.year);
	}
}

type HistoryData = {
	expense: number;
	income: number;
	year: number;
	month: number;
	day?: number;
};

async function getMonthHistoryData(
	userId: string,
	year: number,
	month: number,
) {
	const result = await db.monthHistory.groupBy({
		by: ["day"],
		where: {
			userId,
			year,
			month,
		},
		_sum: {
			expense: true,
			income: true,
		},
		orderBy: [{ day: "asc" }],
	});

	if (!result || result.length === 0) return [];

	const history: HistoryData[] = [];

	const daysInMonth = getDaysInMonth(new Date(year, month));

	for (let i = 1; i <= daysInMonth; i++) {
		let expense = 0;
		let income = 0;

		const day = result.find((row) => row.day === i);

		if (day) {
			expense = day._sum.expense || 0;
			income = day._sum.income || 0;
		}

		history.push({
			year,
			month,
			expense,
			income,
			day: i,
		});
	}

	return history;
}

async function getYearHistoryData(userId: string, year: number) {
	const result = await db.yearHistory.groupBy({
		by: ["month"],
		where: {
			userId,
			year,
		},
		_sum: {
			expense: true,
			income: true,
		},
		orderBy: [{ month: "asc" }],
	});

	if (!result || result.length === 0) return [];

	const history: HistoryData[] = [];

	for (let i = 0; i < 12; i++) {
		let expense = 0;
		let income = 0;

		const month = result.find((row) => row.month === i);

		if (month) {
			expense = month._sum.expense || 0;
			income = month._sum.income || 0;
		}

		history.push({
			year,
			month: i,
			expense,
			income,
		});
	}

	return history;
}

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/user.services";
import { db } from "@/lib/db";

export async function GET(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth/sign-in");
	}

	const periods = await getHistoryPeriods(user.id);

	return Response.json(periods);
}

export type GetHistoryPeriodsResponseType = Awaited<
	ReturnType<typeof getHistoryPeriods>
>;

async function getHistoryPeriods(userId: string) {
	const result = await db.monthHistory.findMany({
		where: {
			userId,
		},
		select: {
			year: true,
		},
		distinct: ["year"],
		orderBy: [
			{
				year: "asc",
			},
		],
	});

	const years = result.map((el) => el.year);

	if (years.length === 0) {
		return [new Date().getFullYear()];
	}

	return years;
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { Settings } from "@prisma/client";

import { GetBalanceStatusResponseType } from "@/app/api/status/balance/route";
import { CurrencyFormatter, DateToUTCDate } from "@/lib/helpers";
import { useMemo } from "react";
import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { StatusCard } from "./status-card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

type Props = {
	settings: Settings;
	from: Date;
	to: Date;
};

export const Status = ({ settings, from, to }: Props) => {
	const statusQuery = useQuery<GetBalanceStatusResponseType>({
		queryKey: ["overview", "status", from, to],
		queryFn: () =>
			fetch(
				`/api/status/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`,
			).then((res) => res.json()),
	});

	const formatter = useMemo(() => {
		return CurrencyFormatter(settings.currency);
	}, [settings.currency]);

	const income = statusQuery.data?.income || 0;
	const expense = statusQuery.data?.expense || 0;
	const balance = income - expense;

	return (
		<div className="relative w-full flex flex-wrap md:flex-nowrap gap-2">
			<SkeletonWrapper isLoading={statusQuery.isLoading} fullWidth>
				<StatusCard
					title="Income"
					value={income}
					formatter={formatter}
					icon={
						<TrendingUp className="w-16 h-16 p-2 text-emerald-600 bg-emerald-400/10 items-center rounded-lg" />
					}
				/>
			</SkeletonWrapper>
			<SkeletonWrapper isLoading={statusQuery.isLoading} fullWidth>
				<StatusCard
					title="Expense"
					value={expense}
					formatter={formatter}
					icon={
						<TrendingDown className="w-16 h-16 p-2 text-rose-600 bg-rose-400/10 items-center rounded-lg" />
					}
				/>
			</SkeletonWrapper>
			<SkeletonWrapper isLoading={statusQuery.isLoading} fullWidth>
				<StatusCard
					title="Balance"
					value={balance}
					formatter={formatter}
					icon={
						<Wallet className="w-16 h-16 p-2 text-sky-600 bg-sky-400/10 items-center rounded-lg" />
					}
				/>
			</SkeletonWrapper>
		</div>
	);
};

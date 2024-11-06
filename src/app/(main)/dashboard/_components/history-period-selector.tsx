"use client";

import { useQuery } from "@tanstack/react-query";

import { Period, TimeFrame } from "@/lib/types";
import { GetHistoryPeriodsResponseType } from "@/app/api/history-periods/route";
import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YearSelector } from "./year-selector";
import { MonthSelector } from "./month-selector";

type Props = {
	period: Period;
	setPeriod: (period: Period) => void;
	timeFrame: TimeFrame;
	setTimeFrame: (timeFrame: TimeFrame) => void;
};

export const HistoryPeriodSelector = ({
	period,
	setPeriod,
	timeFrame,
	setTimeFrame,
}: Props) => {
	const historyPeriods = useQuery<GetHistoryPeriodsResponseType>({
		queryKey: ["overview", "history", "periods"],
		queryFn: () => fetch("/api/history-periods").then((res) => res.json()),
	});

	return (
		<div className="flex flex-wrap items-center gap-4">
			<SkeletonWrapper isLoading={historyPeriods.isFetching}>
				<Tabs
					value={timeFrame}
					onValueChange={(value) => setTimeFrame(value as TimeFrame)}
				>
					<TabsList>
						<TabsTrigger value="year">Year</TabsTrigger>
						<TabsTrigger value="month">Month</TabsTrigger>
					</TabsList>
				</Tabs>
			</SkeletonWrapper>
			<div className="flex flex-wrap items-center gap-2">
				<SkeletonWrapper isLoading={historyPeriods.isFetching}>
					<YearSelector
						period={period}
						setPeriod={setPeriod}
						years={historyPeriods.data || []}
					/>
				</SkeletonWrapper>
				{timeFrame === "month" && (
					<SkeletonWrapper isLoading={historyPeriods.isFetching}>
						<MonthSelector period={period} setPeriod={setPeriod} />
					</SkeletonWrapper>
				)}
			</div>
		</div>
	);
};

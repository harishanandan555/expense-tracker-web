"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "@prisma/client";
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import CountUp from "react-countup";

import { TypographyH2 } from "@/components/typograhpy/typography-h2";
import { Period, TimeFrame } from "@/lib/types";
import { CurrencyFormatter } from "@/lib/helpers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HistoryPeriodSelector } from "./history-period-selector";
import { Badge } from "@/components/ui/badge";
import { GetHistoryDataType } from "@/app/api/history-data/route";
import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { cn } from "@/lib/utils";

type Props = {
	settings: Settings;
};

export const History = ({ settings }: Props) => {
	const [timeFrame, setTimeFrame] = useState<TimeFrame>("month");
	const [period, setPeriod] = useState<Period>({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	});

	const formatter = useMemo(() => {
		return CurrencyFormatter(settings.currency);
	}, [settings.currency]);

	const historyQuery = useQuery<GetHistoryDataType>({
		queryKey: ["overview", "history", timeFrame, period],
		queryFn: () =>
			fetch(
				`/api/history-data?timeframe=${timeFrame}&month=${period.month}&year=${period.year}`,
			).then((res) => res.json()),
	});

	const availableData = historyQuery.data && historyQuery.data.length > 1;

	return (
		<div className="my-6 space-y-4">
			<TypographyH2>History</TypographyH2>
			<Card className="w-full">
				<CardHeader className="gap-2">
					<div className="grid grid-flow-row md:grid-flow-col justify-between gap-2">
						<HistoryPeriodSelector
							period={period}
							setPeriod={setPeriod}
							setTimeFrame={setTimeFrame}
							timeFrame={timeFrame}
						/>
						<div className="flex items-center gap-2 h-10">
							<Badge
								variant="outline"
								className="flex items-center gap-2 text-lg"
							>
								<div className="w-6 h-6 bg-emerald-600 rounded-full"></div>
								Income
							</Badge>
							<Badge
								variant="outline"
								className="flex items-center gap-2 text-lg"
							>
								<div className="w-6 h-6 bg-rose-600 rounded-full"></div>
								Expense
							</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<SkeletonWrapper isLoading={historyQuery.isFetching} fullWidth>
						{availableData && (
							<ResponsiveContainer width="100%" height={300}>
								<BarChart
									height={300}
									data={historyQuery.data}
									barCategoryGap={5}
								>
									<defs>
										<linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset={"0"}
												stopColor="#10b981"
												stopOpacity={"1"}
											/>
											<stop
												offset={"1"}
												stopColor="#10b981"
												stopOpacity={"0"}
											/>
										</linearGradient>
										<linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset={"0"}
												stopColor="#ef4444"
												stopOpacity={"1"}
											/>
											<stop
												offset={"1"}
												stopColor="#ef4444"
												stopOpacity={"0"}
											/>
										</linearGradient>
									</defs>
									<CartesianGrid
										strokeDasharray="5 5"
										strokeOpacity="0.2"
										vertical={false}
									/>
									<XAxis
										fontSize={12}
										tickLine={false}
										axisLine={false}
										padding={{ left: 5, right: 5 }}
										dataKey={(data) => {
											const { year, month, day } = data;
											const date = new Date(year, month, day || 1);
											if (timeFrame === "year") {
												return date.toLocaleDateString("default", {
													month: "long",
												});
											}
											return date.toLocaleDateString("default", {
												day: "2-digit",
											});
										}}
									/>
									<YAxis fontSize={12} tickLine={false} axisLine={false} />
									<Bar
										dataKey="income"
										label="Income"
										fill="url(#incomeBar)"
										radius={4}
										className="cursor-pointer"
									/>
									<Bar
										dataKey="expense"
										label="Expense"
										fill="url(#expenseBar)"
										radius={4}
										className="cursor-pointer"
									/>
									<Tooltip
										cursor={{ opacity: 0.1 }}
										content={(props) => (
											<CustomTooltip formatter={formatter} {...props} />
										)}
									/>
								</BarChart>
							</ResponsiveContainer>
						)}
						{!availableData && (
							<Card className="bg-background flex flex-col items-center justify-center h-[300px]">
								No data for selected period.
								<p className="text-sm text-center text-muted-foreground">
									Trying to select different period or adding new transaction.
								</p>
							</Card>
						)}
					</SkeletonWrapper>
				</CardContent>
			</Card>
		</div>
	);
};

function CustomTooltip({ active, payload, formatter }: any) {
	if (!active || !payload || payload.length === 0) return null;

	const data = payload[0].payload;

	const { expense, income } = data;

	return (
		<div className="min-w-[300px] rounded-lg border bg-background p-4 space-y-2">
			<TooltipRow
				label="Expense"
				value={expense}
				formatter={formatter}
				bgColor="bg-rose-600"
				textColor="text-rose-600"
			/>
			<TooltipRow
				label="Income"
				value={income}
				formatter={formatter}
				bgColor="bg-emerald-600"
				textColor="text-emerald-600"
			/>
			<TooltipRow
				label="Balance"
				value={income - expense}
				formatter={formatter}
				bgColor="bg-gray-600"
				textColor="text-gray-600"
			/>
		</div>
	);
}

function TooltipRow({
	label,
	formatter,
	value,
	bgColor,
	textColor,
}: {
	label: string;
	formatter: Intl.NumberFormat;
	value: number;
	bgColor: string;
	textColor: string;
}) {
	const formattingFn = useCallback(
		(value: number) => formatter.format(value),
		[formatter],
	);

	return (
		<div className="flex items-center gap-2">
			<div className={cn("w-4 h-4 rounded-full", bgColor)} />
			<p className="text-sm text-muted-foreground">{label}</p>
			<div className={cn("text-sm font-bold", textColor)}>
				<CountUp
					duration={0.5}
					preserveValue
					decimals={0}
					end={value}
					formattingFn={formattingFn}
					className="text-sm"
				/>
			</div>
		</div>
	);
}

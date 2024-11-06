"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Period } from "@/lib/types";

type Props = {
	period: Period;
	setPeriod: (period: Period) => void;
};

export const MonthSelector = ({ period, setPeriod }: Props) => {
	return (
		<Select
			value={period.month.toString()}
			onValueChange={(value) => {
				setPeriod({
					month: parseInt(value),
					year: period.year,
				});
			}}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="e.g. 2024" />
			</SelectTrigger>
			<SelectContent>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
					const monthStr = new Date(period.year, month, 1).toLocaleString(
						"default",
						{ month: "long" },
					);

					return (
						<SelectItem key={month} value={month.toString()}>
							{monthStr}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

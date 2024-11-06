"use client";

import { useState } from "react";
import { Settings } from "@prisma/client";
import { differenceInDays, endOfMonth, startOfMonth } from "date-fns";
import { toast } from "sonner";

import { TypographyH2 } from "@/components/typograhpy/typography-h2";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Status } from "./status";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { CategoriesStatus } from "./categories-status";

type Props = {
	settings: Settings;
};

export const Overview = ({ settings }: Props) => {
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});

	return (
		<>
			<div className="my-6 flex flex-wrap items-end justify-between">
				<TypographyH2>Overview</TypographyH2>
				<DateRangePicker
					initialDateFrom={dateRange.from}
					initialDateTo={dateRange.to}
					showCompare={false}
					align="center"
					onUpdate={(value) => {
						const { from, to } = value.range;

						if (!from || !to) return;

						if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
							toast.error(
								`The selected date range is too long. Max allowed date range is ${MAX_DATE_RANGE_DAYS} days!`,
							);

							return;
						}

						setDateRange({ from, to });
					}}
				/>
			</div>
			<div className="space-y-2">
				<Status settings={settings} from={dateRange.from} to={dateRange.to} />
				<CategoriesStatus
					settings={settings}
					from={dateRange.from}
					to={dateRange.to}
				/>
			</div>
		</>
	);
};

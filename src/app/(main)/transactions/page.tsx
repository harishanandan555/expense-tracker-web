"use client";

import { useState } from "react";
import { differenceInDays, endOfMonth, startOfMonth } from "date-fns";
import { toast } from "sonner";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { TypographyH2 } from "@/components/typograhpy/typography-h2";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { TransactionTable } from "./_components/transaction-table";

export default function Page() {
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});

	return (
		<main className="container py-10 space-y-4">
			<section className="flex flex-wrap items-center justify-between gap-2">
				<TypographyH2>Transactions History</TypographyH2>
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
			</section>
			<section>
				<TransactionTable from={dateRange.from} to={dateRange.to} />
			</section>
		</main>
	);
}

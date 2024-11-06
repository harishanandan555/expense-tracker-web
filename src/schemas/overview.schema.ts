import { z } from "zod";
import { differenceInDays } from "date-fns";

import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";

export const OverviewQuerySchema = z
	.object({
		from: z.coerce.date(),
		to: z.coerce.date(),
	})
	.refine((args) => {
		const { from, to } = args;

		const date = differenceInDays(to, from);

		const isValidDate = date >= 0 && date <= MAX_DATE_RANGE_DAYS;

		return isValidDate;
	});

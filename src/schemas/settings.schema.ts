import { z } from "zod";

import { currencies } from "@/lib/currencies";

export const SettingsSchema = z.object({
	currency: z.custom((value) => {
		const valid = currencies.some((c) => c.value === value);

		if (!valid) throw new Error(`Invalid Currency: ${value}`);

		return value;
	}),
});

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;

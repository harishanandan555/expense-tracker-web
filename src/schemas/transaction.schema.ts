import { z } from "zod";

export const CreateTransactionSchema = z.object({
	amount: z.coerce.number().positive().multipleOf(0.01),
	description: z.string().optional(),
	date: z.coerce.date(),
	category: z.string(),
	type: z.union([z.literal("income"), z.literal("expense")]),
});

export type CreateTransactionSchemaType = z.infer<
	typeof CreateTransactionSchema
>;

//===================================================================

// import { z } from "zod";

// export const CreateTransactionSchema = z.object({
// 	amount: z.coerce.number().positive().multipleOf(0.01),
// 	description: z.string().optional(),
// 	date: z.coerce.date(), // This remains required for the first schema
// 	category: z.string(),
// 	type: z.union([z.literal("income"), z.literal("expense")]),
// });

// export const CreateTransactionDateSchema = z.object({
// 	amount: z.coerce.number().positive().multipleOf(0.01),
// 	description: z.string().optional(),
// 	date: z.date().optional(), // Updated to be optional
// 	category: z.string(),
// 	type: z.union([z.literal("income"), z.literal("expense")]),
// });

// export type CreateTransactionSchemaType = z.infer<typeof CreateTransactionSchema>;

// export type CreateTransactionDateSchemaType = z.infer<typeof CreateTransactionDateSchema>;

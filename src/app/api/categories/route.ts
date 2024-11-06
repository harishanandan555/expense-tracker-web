// import { redirect } from "next/navigation";
// import { z } from "zod";

// import { getCurrentUser } from "@/services/user.services";
// import { db } from "@/lib/db";

// export async function GET(request: Request) {
// 	const user = await getCurrentUser();

// 	if (!user) {
// 		redirect("/auth/sign-in");
// 	}

// 	const { searchParams } = new URL(request.url);
// 	const paramType = searchParams.get("type");

// 	const validator = z.enum(["income", "expense"]);
// 	const queryParams = validator.safeParse(paramType);

// 	if (!queryParams.success) {
// 		return Response.json(queryParams.error, {
// 			status: 400,
// 		});
// 	}

// 	const type = queryParams.data;

// 	const categories = await db.category.findMany({
// 		where: {
// 			userId: user.id,
// 			...(type && { type }),
// 		},
// 		orderBy: {
// 			name: "asc",
// 		},
// 	});

// 	return Response.json(categories);
// }


//======================================================================================================//

// import { redirect } from "next/navigation";
// import { z } from "zod";

// import { getCurrentUser } from "@/services/user.services";
// import { db } from "@/lib/db";

// export async function GET(request: Request) {
// 	const user = await getCurrentUser();

// 	if (!user) {
// 		redirect("/auth/sign-in");
// 	}

// 	const { searchParams } = new URL(request.url);
// 	const paramType = searchParams.get("type");

// 	const validator = z.enum(["income", "expense"]);
// 	const queryParams = validator.safeParse(paramType);

// 	if (!queryParams.success) {
// 		return Response.json(queryParams.error, {
// 			status: 400,
// 		});
// 	}

// 	const type = queryParams.data;

// 	// Fetch user-specific categories
// 	const userCategories = await db.category.findMany({
// 		where: {
// 			userId: user.id,
// 			...(type && { type }),
// 		},
// 		orderBy: {
// 			name: "asc",
// 		},
// 	});

// 	// Fetch default categories of the specified type
// 	const defaultCategories = await db.defaultCategory.findMany({
// 		where: {
// 			...(type && { type }),
// 		},
// 		orderBy: {
// 			name: "asc",
// 		},
// 	});

// 	// Combine both arrays of categories
// 	const combinedCategories = [...defaultCategories, ...userCategories];

// 	return Response.json(combinedCategories);
// }


//======================================================================================================//


import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentUser } from "@/services/user.services";
import { db } from "@/lib/db";

export async function GET(request: Request) {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth/sign-in");
	}

	const { searchParams } = new URL(request.url);
	const paramType = searchParams.get("type");

	const validator = z.enum(["income", "expense"]);
	const queryParams = validator.safeParse(paramType);

	if (!queryParams.success) {
		return Response.json(queryParams.error, {
			status: 400,
		});
	}

	const type = queryParams.data;

	// Fetch user-specific categories
	const userCategories = await db.category.findMany({
		where: {
			userId: user.id,
			...(type && { type }),
		},
		orderBy: {
			name: "asc",
		},
	});

	// Fetch default categories of the specified type
	const defaultCategories = await db.defaultCategory.findMany({
		where: {
			...(type && { type }),
		},
		orderBy: {
			name: "asc",
		},
	});

	// Combine both arrays of categories and add `isDefault` flag
	const combinedCategories = [
		...defaultCategories.map(category => ({ ...category, isDefault: true })),
		...userCategories.map(category => ({ ...category, isDefault: false })),
	];

	return Response.json(combinedCategories);
}

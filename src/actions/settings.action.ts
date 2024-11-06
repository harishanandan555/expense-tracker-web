// "use server";

// import { db } from "@/lib/db";
// import { SettingsSchema } from "@/schemas/settings.schema";
// import { getCurrentUser } from "@/services/user.services";
// import { redirect } from "next/navigation";

// export async function UpdateUserCurrency(currency: string) {
// 	const parsedBody = SettingsSchema.safeParse({ currency });

// 	if (!parsedBody.success) {
// 		throw parsedBody.error;
// 	}

// 	const user = await getCurrentUser();

// 	if (!user) {
// 		redirect("/auth/sign-in");
// 	}

// 	const settings = await db.settings.update({
// 		where: { userId: user.id },
// 		data: { currency },
// 	});

// 	return settings;
// }



"use server";

import { SettingsSchema } from "@/schemas/settings.schema";
import { getCurrentUser } from "@/services/user.services";
import { redirect } from "next/navigation";
import { updateUserCurrency } from "@/services/firebaseSettings";

export async function UpdateUserCurrency(currency: any) {
  const parsedBody = SettingsSchema.safeParse({ currency });

  if (!parsedBody.success) {
    throw parsedBody.error;
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Update the user's currency in Firestore
  const updatedSettings: any = await updateUserCurrency(user.id, currency);

  if (!updatedSettings) {
    throw new Error("Failed to update user currency in Firestore.");
  }

  return updatedSettings;
}

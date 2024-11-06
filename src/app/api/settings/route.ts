// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

// import { getCurrentUser } from "@/services/user.services";
// import { db } from "@/lib/db";

// export async function GET() {

//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/auth/sign-in");
//   }

//   let settings = await db.settings.findUnique({ where: { userId: user.id } });

//   if (!settings) {
//     settings = await db.settings.create({
//       data: { userId: user.id, currency: "USD" },
//     });
//   }

//   revalidatePath("/dashboard");
//   return Response.json(settings);

// }





import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/services/user.services";
import { getSettingsByUserId, storeSettings } from "@/services/firebaseSettings";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Check for existing settings in Firestore
  let settings = await getSettingsByUserId(user.id);

  // If settings do not exist, create new settings with default currency "USD"
  if (!settings) {
    await storeSettings({
      userId: user.id,
      currency: "USD",
    });
    settings = await getSettingsByUserId(user.id); // Retrieve the newly created settings
  }

  revalidatePath("/dashboard");
  return Response.json(settings);
}

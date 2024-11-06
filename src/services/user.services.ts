// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// import { db } from "@/lib/db";
// import { authOptions } from "@/lib/auth";

// export async function getCurrentUser() {
	
// 	const session = await getServerSession(authOptions);

// 	if (!session || !session?.user || !session?.user?.email) {
// 		return redirect("/auth/sign-in");
// 	}

// 	const user = await getUserByEmail(session.user.email);

// 	return user;
	
// }

// export const getUserByEmail = async (email: string) => {
// 	try {
// 		const user = await db.user.findUnique({
// 			where: { email },
// 		});

// 		return user;
// 	} catch {
// 		return null;
// 	}
// };

// export async function getSettings() {
// 	const user = await getCurrentUser();

// 	if (!user) {
// 		return redirect("/auth/sign-in");
// 	}

// 	const settings = await db.settings.findUnique({
// 		where: {
// 			userId: user.id,
// 		},
// 	});

// 	return settings;
// }



import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getSettingsByUserId } from "@/services/firebaseSettings";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    redirect("/auth/sign-in");
  }

  const user = await getUserByEmail(session.user.email);

  return user;
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch {
    return null;
  }
};

export async function getSettings() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Use Firestore function to retrieve settings by user ID
  const settings = await getSettingsByUserId(user.id);

  return settings;
}

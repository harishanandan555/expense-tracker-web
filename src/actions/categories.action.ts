"use server";

import { redirect } from "next/navigation";

import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  DeleteCategorySchema,
  DeleteCategorySchemaType,
} from "@/schemas/categories.schema";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user.services";
import { hasSubscription } from "@/services/stripe.services";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { name, icon, type } = parsedBody.data;

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  const hasAccess = await hasSubscription();

  if (!hasAccess && user.categoriesAttemps === 0) {
    return redirect("/upgrade?categoriesLimit=true");
  }

  const { "0": category } = await db.$transaction([
    db.category.create({
      data: {
        userId: user.id,
        name,
        icon,
        type,
      },
    }),
    // Decrease categories attemps
    db.user.update({
      where: {
        id: user.id,
      },
      data: {
        categoriesAttemps: {
          decrement: hasAccess ? 0 : 1,
        },
      },
    }),
  ]);

  return category;
}

export async function DeleteCategory(form: DeleteCategorySchemaType) {
  const parsedBody = DeleteCategorySchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const { name, type } = parsedBody.data;

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return await db.category.delete({
    where: {
      name_userId_type: {
        name,
        type,
        userId: user.id,
      },
    },
  });
}

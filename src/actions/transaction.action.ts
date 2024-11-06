// "use server";

// import { redirect } from "next/navigation";

// import {
//   CreateTransactionSchema,
//   CreateTransactionSchemaType,
// } from "@/schemas/transaction.schema";
// import { getCurrentUser } from "@/services/user.services";
// import { db } from "@/lib/db";
// import { hasSubscription } from "@/services/stripe.services";

// export async function CreateTransaction(form: CreateTransactionSchemaType) {
//   const parsedBody = CreateTransactionSchema.safeParse(form);

//   if (!parsedBody.success) {
//     throw new Error(parsedBody.error.message);
//   }

//   const user = await getCurrentUser();

//   if (!user) {
//     return redirect("/auth/sign-in");
//   }

//   const hasAccess = await hasSubscription();

//   if (!hasAccess && user.transactionsAttemps === 0) {
//     return redirect("/upgrade?transactionsLimit=true");
//   }

//   const { description, amount, category, date, type } = parsedBody.data;

//   const categoryRow = await db.category.findFirst({
//     where: {
//       userId: user.id,
//       name: category,
//     },
//   }) || await db.defaultCategory.findFirst({            //
//     where: {
//       name: category,
//     },
//   });

//   if (!categoryRow) {
//     throw new Error("Category not found!");
//   }

//   await db.$transaction([
//     // Create Transaction
//     db.transaction.create({
//       data: {
//         userId: user.id,
//         description: description || "",
//         amount,
//         type,
//         category: categoryRow.name,
//         categoryIcon: categoryRow.icon,
//         date,
//       },
//     }),
    
//     // Decrease Transactions Attemps if user not subscbrice
//     db.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         transactionsAttemps: {
//           decrement: hasAccess ? 0 : 1,
//         },
//       },
//     }),

//     // Update month aggragates
//     db.monthHistory.upsert({
//       where: {
//         day_month_year_userId: {
//           userId: user.id,
//           day: date.getUTCDate(),
//           month: date.getUTCMonth(),
//           year: date.getUTCFullYear(),
//         },
//       },
//       create: {
//         userId: user.id,
//         day: date.getUTCDate(),
//         month: date.getUTCMonth(),
//         year: date.getUTCFullYear(),
//         expense: type === "expense" ? amount : 0,
//         income: type === "income" ? amount : 0,
//       },
//       update: {
//         expense: {
//           increment: type === "expense" ? amount : 0,
//         },
//         income: {
//           increment: type === "income" ? amount : 0,
//         },
//       },
//     }),
    
//     // Update year aggragates
//     db.yearHistory.upsert({
//       where: {
//         month_year_userId: {
//           userId: user.id,
//           month: date.getUTCMonth(),
//           year: date.getUTCFullYear(),
//         },
//       },
//       create: {
//         userId: user.id,
//         month: date.getUTCMonth(),
//         year: date.getUTCFullYear(),
//         expense: type === "expense" ? amount : 0,
//         income: type === "income" ? amount : 0,
//       },
//       update: {
//         expense: {
//           increment: type === "expense" ? amount : 0,
//         },
//         income: {
//           increment: type === "income" ? amount : 0,
//         },
//       },
//     }),
//   ]);
// }

// export async function DeleteTransaction(transactionId: string) {
//   const user = await getCurrentUser();

//   if (!user) {
//     return redirect("/auth/sign-in");
//   }

//   const transaction = await db.transaction.findUnique({
//     where: {
//       id: transactionId,
//     },
//   });

//   if (!transaction) {
//     throw new Error("Transaction with this ID is not found!");
//   }

//   await db.$transaction([
//     // Delete Transaction
//     db.transaction.delete({
//       where: {
//         id: transactionId,
//         userId: user.id,
//       },
//     }),
//     // Update month History
//     db.monthHistory.update({
//       where: {
//         day_month_year_userId: {
//           userId: user.id,
//           day: transaction.date.getUTCDate(),
//           month: transaction.date.getUTCMonth(),
//           year: transaction.date.getUTCFullYear(),
//         },
//       },
//       data: {
//         ...(transaction.type === "expense" && {
//           expense: {
//             decrement: transaction.amount,
//           },
//         }),
//         ...(transaction.type === "income" && {
//           income: {
//             decrement: transaction.amount,
//           },
//         }),
//       },
//     }),
//     // Update year History
//     db.yearHistory.update({
//       where: {
//         month_year_userId: {
//           userId: user.id,
//           month: transaction.date.getUTCMonth(),
//           year: transaction.date.getUTCFullYear(),
//         },
//       },
//       data: {
//         ...(transaction.type === "expense" && {
//           expense: {
//             decrement: transaction.amount,
//           },
//         }),
//         ...(transaction.type === "income" && {
//           income: {
//             decrement: transaction.amount,
//           },
//         }),
//       },
//     }),
//   ]);

//   return transaction;
// }




"use server";

import { redirect } from "next/navigation";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schemas/transaction.schema";
import { getCurrentUser } from "@/services/user.services";
import { hasSubscription } from "@/services/stripe.services";
import { storeTransaction, deleteFirestoreTransaction, getFirestoreTransactionById} from "@/services/firebaseSettings";  // Import Firestore function
import { db } from "@/lib/db";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  const hasAccess = await hasSubscription();

  if (!hasAccess && user.transactionsAttemps === 0) {
    return redirect("/upgrade?transactionsLimit=true");
  }

  const { description, amount, category, date, type } = parsedBody.data;

  const categoryRow = await db.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  }) || await db.defaultCategory.findFirst({
    where: {
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("Category not found!");
  }

  // // Storing transaction in Firestore
  // await storeTransaction({
  //   id: "",  // Firestore will generate this
  //   userId: user.id,
  //   description: description || "",
  //   amount,
  //   type,
  //   category: categoryRow.name,
  //   categoryIcon: categoryRow.icon,
  //   date,
  //   category: categoryRow.name,  // Prisma `category` field
  //   categoryIcon: categoryRow.icon,
  // });
  await storeTransaction({
    // id: "",  // Firestore will generate this
    userId: user.id,  // Prisma `userId` field
    description: description || "",  // Prisma `description` field
    amount,  // Prisma `amount` field (Float)
    type,  // Prisma `type` field, default "income" if not provided
    date,  // Prisma `date` field (DateTime)
    category: categoryRow.name,  // Prisma `category` field
    categoryIcon: categoryRow.icon,  // Prisma `categoryIcon` field
    createdAt: new Date(),  // Storing `createdAt` timestamp
    updatedAt: new Date(),  // Storing `updatedAt` timestamp
  });
  
  // Updating transaction attempts in SQLite (for non-subscribed users)
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      transactionsAttemps: {
        decrement: hasAccess ? 0 : 1,
      },
    },
  });

  // Keeping monthHistory and yearHistory updates in SQLite
  await db.monthHistory.upsert({
    where: {
      day_month_year_userId: {
        userId: user.id,
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
      },
    },
    create: {
      userId: user.id,
      day: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      expense: type === "expense" ? amount : 0,
      income: type === "income" ? amount : 0,
    },
    update: {
      expense: {
        increment: type === "expense" ? amount : 0,
      },
      income: {
        increment: type === "income" ? amount : 0,
      },
    },
  });

  await db.yearHistory.upsert({
    where: {
      month_year_userId: {
        userId: user.id,
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
      },
    },
    create: {
      userId: user.id,
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      expense: type === "expense" ? amount : 0,
      income: type === "income" ? amount : 0,
    },
    update: {
      expense: {
        increment: type === "expense" ? amount : 0,
      },
      income: {
        increment: type === "income" ? amount : 0,
      },
    },
  });
}



// "use server";

// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/services/user.services";
// import { deleteFirestoreTransaction, getFirestoreTransactionById } from "@/services/firebaseSettings";  // New Firestore deletion function
// import { db } from "@/lib/db";

export async function DeleteTransaction(transactionId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  // Fetch transaction from Firestore instead of SQLite
  const transaction = await getFirestoreTransactionById(transactionId); // Implement this function to fetch from Firestore

  if (!transaction) {
    throw new Error("Transaction with this ID is not found!");
  }

  // Deleting transaction from Firestore
  await deleteFirestoreTransaction(transactionId);

  // Updating month and year history in SQLite
  await db.monthHistory.update({
    where: {
      day_month_year_userId: {
        userId: user.id,
        day: transaction.date.getUTCDate(),
        month: transaction.date.getUTCMonth(),
        year: transaction.date.getUTCFullYear(),
      },
    },
    data: {
      ...(transaction.type === "expense" && {
        expense: {
          decrement: transaction.amount,
        },
      }),
      ...(transaction.type === "income" && {
        income: {
          decrement: transaction.amount,
        },
      }),
    },
  });

  await db.yearHistory.update({
    where: {
      month_year_userId: {
        userId: user.id,
        month: transaction.date.getUTCMonth(),
        year: transaction.date.getUTCFullYear(),
      },
    },
    data: {
      ...(transaction.type === "expense" && {
        expense: {
          decrement: transaction.amount,
        },
      }),
      ...(transaction.type === "income" && {
        income: {
          decrement: transaction.amount,
        },
      }),
    },
  });

  return transaction;
}

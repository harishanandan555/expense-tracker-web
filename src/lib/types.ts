export type TransactionType = "income" | "expense";
export type TimeFrame = "month" | "year";
export type Period = { month: number; year: number };

export interface Settings {
  id: string;
  currency: string;
  userId: string; // Added userId
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}
  
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string; // Default is "income"
  date: Date; // Use Date object for better handling
  userId: string; // Added userId
  category: string; // Add the category
  categoryIcon: string; // Add the categoryIcon
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}

export interface StripeCustomer {
  id: string;
  stripeCustomerId: string; // This is the ID from Stripe
  userId: string; // Added userId
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}

export interface User {
  id: string;
  name: string; // Optional
  email: string; // Optional, should be unique
  emailVerified?: Date; // Optional
  image?: string; // Optional
  transactionsAttemps?: number; // Default is 5
  categoriesAttemps?: number; // Default is 5
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}

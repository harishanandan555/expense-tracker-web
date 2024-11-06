import { db } from "@/lib//firebase";
import { collection, addDoc, deleteDoc, doc, getDoc, query, where, orderBy, getDocs, updateDoc } from 'firebase/firestore';

interface Settings {
  id: string;
  currency: string;
  userId: string; // Added userId
  createdAt?: Date; // Optional because Firestore will handle it
  updatedAt?: Date; // Optional because Firestore will handle it
}

interface Transaction {
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

interface StripeCustomer {
  id: string;
  stripeCustomerId: string; // This is the ID from Stripe
  userId: string; // Added userId
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}

interface User {
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

export async function storeTransaction(transaction: Omit<Transaction, 'id'>) {
  const transactionCollection = collection(db, 'Transaction');
  try {
    const docRef = await addDoc(transactionCollection, {
      ...transaction,
      createdAt: transaction.createdAt || new Date(),
      updatedAt: transaction.updatedAt || new Date(),
    });
    console.log('Transaction document written with ID: ', docRef.id);
    return docRef.id; // Return the generated ID if needed
  } catch (e) {
    console.error('Error adding transaction: ', e);
    throw new Error(`Error storing transaction: ${e}`);
  }
}

export async function getFirestoreTransactionById(transactionId: string) {
  const docRef = doc(db, 'Transaction', transactionId);
  const transaction = await getDoc(docRef);
  if (transaction.exists()) {
    return transaction.data();
  }
  return null;
}

export async function getTransactionsByUserIdAndDate(userId: string, from: Date, to: Date) {
  const transactionCollection = collection(db, 'Transaction');
  const q = query(
    transactionCollection,
    where("userId", "==", userId),
    where("date", ">=", from),
    where("date", "<=", to),
    orderBy("date", "desc")
  );

  const querySnapshot = await getDocs(q);
  const transactions: Transaction[] = [];
  querySnapshot.forEach((doc) => {
    transactions.push({ id: doc.id, ...doc.data() } as Transaction);
  });

  return transactions;
}

export async function deleteFirestoreTransaction(transactionId: string) {
  const docRef = doc(db, 'Transaction', transactionId);
  try {
    await deleteDoc(docRef);
    console.log('Transaction deleted with ID: ', transactionId);
  } catch (e) {
    console.error('Error deleting transaction: ', e);
    throw new Error(`Error deleting transaction: ${e}`);
  }
}

export async function storeStripeCustomer(customer: Omit<StripeCustomer, 'id'>) {
  const customerCollection = collection(db, 'StripeCustomer');
  try {
    const docRef = await addDoc(customerCollection, {
      ...customer,
      createdAt: customer.createdAt || new Date(),
      updatedAt: customer.updatedAt || new Date(),
    });
    console.log('Stripe Customer document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error(`Error storing Stripe customer: ${e}`);
  }
}

export async function getStripeCustomerByUserId(userId: string): Promise<StripeCustomer | null> {
  const customerCollection = collection(db, 'StripeCustomer');
  const q = query(customerCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as StripeCustomer;
  }

  return null; // Return null if no Stripe customer is found
}

export async function storeSettings(settings: Omit<Settings, 'id'>) {
  const settingsCollection = collection(db, 'Settings');
  try {
    await addDoc(settingsCollection, {
      ...settings,
      createdAt: settings.createdAt || new Date(),
      updatedAt: settings.updatedAt || new Date(),
    });
    console.log('Settings document successfully written.');
  } catch (e) {
    console.error('Error adding settings document: ', e);
  }
}

export async function getSettingsByUserId(userId: string): Promise<Settings | null> {
  const settingsCollection = collection(db, "Settings");
  const q = query(settingsCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      currency: data.currency,
      userId: data.userId,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as Settings;
  }

  return null;
}

export async function updateUserCurrency(userId: string, currency: string): Promise<Settings | null> {
  const settingsCollection = collection(db, 'Settings');
  const settingsQuery = query(settingsCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(settingsQuery);

  if (!querySnapshot.empty) {
    const docRef = doc(db, 'Settings', querySnapshot.docs[0].id);
    await updateDoc(docRef, { currency, updatedAt: new Date() });
    
    return { id: docRef.id, userId, currency, updatedAt: new Date() } as Settings;
  }

  return null;
}

async function storeUser(user: User) {
  const userCollection = collection(db, 'User');
  try {
    await addDoc(userCollection, user);
    console.log('User document written with ID: ', user.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

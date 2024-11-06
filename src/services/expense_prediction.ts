
// import * as tf from '@tensorflow/tfjs';

// // Disable TensorFlow.js logs
// tf.setBackend('cpu'); // or 'webgl'
// tf.enableProdMode(); // This will silence logging in production mode


// interface ExpenseData {
//     month: number;
//     expense: number;
// }

// async function trainExpenseModel(expenseData: ExpenseData[]) {
// 	try {
// 		const inputs = expenseData.map((d) => d.month);
// 		const labels = expenseData.map((d) => d.expense);
	  
// 		const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
// 		const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
	  
// 		// Define a simple sequential model
// 		const model = tf.sequential();
// 		model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
	  
// 		model.compile({
// 		  optimizer: 'sgd',
// 		  loss: 'meanSquaredError',
// 		});
	  
// 		// Train the model
// 		await model.fit(inputTensor, labelTensor, {
// 			epochs: 500, // Increased number of epochs
// 			shuffle: true, // Still shuffling
// 		});
	  
// 		return model;
// 	} catch (error) {
// 		console.error('An error occurred during model training:', error);
// 	}
// }

// // Predict future expense based on the model and the future month
// async function predictExpense(model: tf.LayersModel, futureMonth: number): Promise<any> {
// 	try {
// 		const prediction = model.predict(tf.tensor2d([futureMonth], [1, 1])) as tf.Tensor;
// 		return prediction.dataSync()[0]; // Return the predicted expense
// 	} catch (error) {
// 		console.error('An error occurred during prediction:', error);
// 	}
// }

// const expenseData = [
//     { month: 1, expense: 100 },
//     { month: 2, expense: 150 },
//     { month: 3, expense: 200 },
//     { month: 4, expense: 250 },
//     { month: 5, expense: 300 },
//   ];

// async function run() {
// 	try {

// 		let model: tf.LayersModel | undefined;

// 		console.log('Training the expense prediction model...');
  
// 		// Train the model with the dummy data
// 		model = await trainExpenseModel(expenseData);
		
// 		if (!model) {
// 		  throw new Error('Model is undefined after training');
// 		}
	  
// 		console.log('Model training completed.');
	  
// 		// Predict expenses for a future month (e.g., month 6)
// 		const futureMonth = 6;
// 		const predictedExpense = await predictExpense(model, futureMonth);
	  
// 		console.log(`Predicted expense for month ${futureMonth}: $${predictedExpense.toFixed(2)}`);

// 	} catch (error) {
// 		console.error('An error occurred during runing:', error);
// 	}
// }
  
// run();


// interface Transaction {
//   id: string;
//   description: string;
//   amount: number;
//   type: 'income' | 'expense';
//   date: number;
//   userId: string;
//   category: string;
//   categoryIcon: string;
//   createdAt: number;
//   updatedAt: number;
// }

// interface ExpenseData {
//   month: number;
//   expense: number;
// }

// // Sample transactions extracted from your SQLite data
// const transactions: Transaction[] = [
//   { id: 'clxxorv7a0001i92m9zp9xtkf', description: 'Freelancing Gig', amount: 15000.0, type: 'income', date: 1717286400000, userId: 'clxw7i81f0000137imtq3zy12', category: 'Freelancing', categoryIcon: '👨‍💻', createdAt: 1719518257846, updatedAt: 1719518257846 },
//   { id: 'clxxosbei0003i92myd7nf7e0', description: 'Gym Subscription', amount: 300.0, type: 'expense', date: 1719619200000, userId: 'clxw7i81f0000137imtq3zy12', category: 'GYM', categoryIcon: '💪', createdAt: 1719518278843, updatedAt: 1719518278843 },
//   { id: 'clxxou0oc0005i92mpbca667t', description: 'Profit From Selling Items', amount: 5734.0, type: 'income', date: 1718409600000, userId: 'clxw7i81f0000137imtq3zy12', category: 'Business', categoryIcon: '💼', createdAt: 1719518358253, updatedAt: 1719518358253 },
//   { id: 'clxxov0hb0007i92mn5q5py17', description: 'Upwork Gigs', amount: 2444.0, type: 'income', date: 1717718400000, userId: 'clxw7i81f0000137imtq3zy12', category: 'Freelancing', categoryIcon: '👨‍💻', createdAt: 1719518404655, updatedAt: 1719518404655 },
//   { id: 'clxxoxce30009i92msq6ekm3t', description: 'Buying Some Clothes', amount: 700.0, type: 'expense', date: 1719619200000, userId: 'clxw7i81f0000137imtq3zy12', category: 'Clothes', categoryIcon: '👕', createdAt: 1719518513404, updatedAt: 1719518513404 },
//   { id: 'clxxpq5tw000bi92mrhfy1pon', description: 'Coding Courses', amount: 500.0, type: 'expense', date: 1719529313427, userId: 'clxw7i81f0000137imtq3zy12', category: 'Courses', categoryIcon: '📖', createdAt: 1719519857924, updatedAt: 1719519857924 },
//   { id: 'clxxpqzfk000di92mmp4zh0eo', description: 'Buying some food', amount: 200.0, type: 'expense', date: 1718150400000, userId: 'clxw7i81f0000137imtq3zy12', category: 'Food', categoryIcon: '🌮', createdAt: 1719519896288, updatedAt: 1719519896288 },
// ];

// // Function to preprocess the transactions and extract monthly expenses
// function getMonthlyExpenses(transactions: Transaction[]): ExpenseData[] {
// try {
//   const monthlyExpenses: { [key: number]: number } = {};

//   transactions.forEach(transaction => {
//     const month = new Date(transaction.date).getMonth() + 1; // Get month (1-12)
//     if (transaction.type === 'expense') {
//       if (!monthlyExpenses[month]) {
//         monthlyExpenses[month] = 0;
//       }
//       monthlyExpenses[month] += transaction.amount; // Sum expenses for the month
//     }
//   });

//   // Convert the monthly expenses object to an array of ExpenseData
//   return Object.entries(monthlyExpenses).map(([month, expense]) => ({
//     month: parseInt(month, 10),
//     expense,
//   }));
// } catch (error) {
//       console.error('An error occurred during model training:', error);
//       throw error; // Propagate the error
//   }
// }

// async function trainExpenseModel(expenseData: ExpenseData[]): Promise<tf.LayersModel> {
//   try {
//       const inputs = expenseData.map((d) => d.month);
//       const labels = expenseData.map((d) => d.expense);

//       const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
//       const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

//       // Define a simple sequential model
//       const model = tf.sequential();
//       model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

//       model.compile({
//           optimizer: 'sgd',
//           loss: 'meanSquaredError',
//       });

//       // Train the model
//       await model.fit(inputTensor, labelTensor, {
//           epochs: 500,
//           shuffle: true,
//       });

//       return model;
//   } catch (error) {
//       console.error('An error occurred during model training:', error);
//       throw error; // Propagate the error
//   }
// }

// // Predict future expense based on the model and the future month
// async function predictExpense(model: tf.LayersModel, futureMonth: number): Promise<number> {
//   try {
//       const prediction = model.predict(tf.tensor2d([futureMonth], [1, 1])) as tf.Tensor;
//       return prediction.dataSync()[0]; // Return the predicted expense
//   } catch (error) {
//       console.error('An error occurred during prediction:', error);
//       throw error; // Propagate the error
//   }
// }

// async function run() {
//   try {
//       const monthlyExpenseData = getMonthlyExpenses(transactions);
//       let model: tf.LayersModel | undefined;

//       console.log('Training the expense prediction model...');

//       // Train the model with the monthly expenses data
//       model = await trainExpenseModel(monthlyExpenseData);

//       if (!model) {
//           throw new Error('Model is undefined after training');
//       }

//       console.log('Model training completed.');

//       // Predict expenses for a future month (e.g., month 7)
//       const futureMonth = 7;
//   // transaction.date
//   // transaction.type
//   // transaction.amount
  
//       const predictedExpense = await predictExpense(model, futureMonth);

//       console.log(`Predicted expense for month ${futureMonth}: $${predictedExpense.toFixed(2)}`);

//   } catch (error) {
//       console.error('An error occurred during running:', error);
//   }
// }

// run();
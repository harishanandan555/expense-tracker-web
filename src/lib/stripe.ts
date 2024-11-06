import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const priceId = process.env.STRIPE_PRICEID;

export const plan = {
  features: [
    {
      id: 1,
      label: "Unlimted Transactions",
    },
    {
      id: 2,
      label: "Unlimted Categories",
    },
  ],
  price: 5.99,
  interval: "monthly",
};







// export const fetchCurrencies = async (): Promise<any[]> => {
//     try {
// 		const currencyData = await db.currency.findMany();

// 		// console.log("Fetched currencies:", __dirname, JSON.stringify(currencyData, null, 2));
		
// 		const formattedCurrencies = currencyData.map((currency) => ({
// 			value: currency.value || 'N/A', // Use currency.value instead of currency.code
// 			label: currency.label || 'Unknown', // Use currency.label instead of currency.name
// 			locale: currency.locale || 'en-US', // Default to 'en-US' if locale is undefined
// 		}));

// 		// console.log("Formatted currencies:", JSON.stringify(formattedCurrencies, null, 2));
		
// 		return formattedCurrencies;
//     } catch (error) {
//         console.error('Error fetching currencies:', error);
//         throw new Error('Failed to fetch currencies'); 
//     }
// };

// export let currencies: any[] = [];


// const main = async () => {
//     try {
//         currencies = await fetchCurrencies();
//     } catch (error) {
//         console.error("Error fetching currencies:", error);
//     }
// };

// main().catch(console.error);
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getSettings } from "@/services/user.services";
import { CreateTransactionDialog } from "./_components/create-transaction-dialog";
import { Overview } from "./_components/overview";
import { History } from "./_components/history";

export default async function Page() {
	const settings = await getSettings();

	if (!settings) {
		return redirect("/onboarding");
	}

	return (
		<main className="container py-10">
			<div className="flex items-center justify-end gap-2">
				<CreateTransactionDialog type="income">
					<Button>New Income</Button>
				</CreateTransactionDialog>
				<CreateTransactionDialog type="expense">
					<Button variant="outline">New Expense</Button>
				</CreateTransactionDialog>
			</div>
			<Overview settings={settings} />
			<History settings={settings} />
		</main>
	);
}

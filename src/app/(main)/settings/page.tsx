"use client";


import { TypographyH2 } from "@/components/typograhpy/typography-h2";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CurrencyComboBox } from "@/components/globals/currency-combo-box";
import { BillingSection } from "./_components/billing-section";
import { CategoriesList } from "./_components/categories-list";

export default function Page() {
	return (
		<main className="container py-10 space-y-3">
			<div className="space-y-1">

				<TypographyH2>Settings</TypographyH2>

				<p className="text-lg text-muted-foreground font-medium">
					Manage your settings and categories
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle> Currency </CardTitle>
					<CardDescription> Set your default currency. </CardDescription>
				</CardHeader>
				<CardContent>
					<CurrencyComboBox />
				</CardContent>
			</Card>

			<BillingSection />

			<CategoriesList type="income" />

			<CategoriesList type="expense" />

		</main>
	);
}

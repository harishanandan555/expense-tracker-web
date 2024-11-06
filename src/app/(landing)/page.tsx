"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { TypographyH1 } from "@/components/typograhpy/typograhpy-h1";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/typograhpy/typography-h2";
import { FAQS, FEATURES } from "@/lib/constants";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { plan } from "@/lib/stripe";
import { FeatureField } from "../upgrade/_components/feature-field";
import { CheckoutButton } from "../upgrade/_components/checkout-button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
	const { status } = useSession();

	return (
		<main className="wrapper py-16 space-y-20">
			<section className="flex flex-col-reverse items-center justify-center md:flex-row md:justify-between gap-4">
				{/* Information */}
				<div className="flex flex-col items-center md:items-start gap-4">
					<div className="text-center md:text-left space-y-1.5">
						<div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-transparent">
							<TypographyH1>MoneyMap</TypographyH1>
						</div>
						<p className="text-xl text-muted-foreground">
							Empowering Your Financial Journey: Seamlessly Track, Plan, and
							Optimize Every Dollar with Confidence and Clarity
						</p>
					</div>
					<Button asChild>
						<Link
							href={status === "authenticated" ? "/dashboard" : "/auth/sign-in"}
						>
							Get Started!
						</Link>
					</Button>
				</div>
				<Image
					src="/images/credit-card.svg"
					alt="Credit Card Image"
					width={280}
					height={280}
				/>
			</section>
			<section className="space-y-4">
				<div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-transparent">
					<TypographyH2>Features</TypographyH2>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-4">
					{FEATURES.map((item) => (
						<Card key={item.id} className="max-w-[260px]">
							<CardHeader>
								<CardTitle>{item.feature}</CardTitle>
							</CardHeader>
							<CardContent className="text-lg text-muted-foreground">
								{item.description}
							</CardContent>
						</Card>
					))}
				</div>
			</section>
			<section className="space-y-4">
				<div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-transparent">
					<TypographyH2>Upgrade To Premium</TypographyH2>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Features</CardTitle>
					</CardHeader>
					<CardContent className="sapce-y-3">
						{plan.features.map((feature) => (
							<FeatureField key={feature.id} label={feature.label} />
						))}
					</CardContent>
					<CardFooter className="flex flex-col items-start space-y-4">
						<div>
							<span className="text-4xl font-extrabold">${plan.price}</span>
							<span className="text-muted-foreground text-xl">
								/{plan.interval}
							</span>
						</div>
						<CheckoutButton />
					</CardFooter>
				</Card>
			</section>
			<section>
				<div className="text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-transparent">
					<TypographyH2>FAQs</TypographyH2>
				</div>
				<Accordion type="single" collapsible className="w-full">
					{FAQS.map((faq) => (
						<AccordionItem key={faq.id} value={faq.id}>
							<AccordionTrigger>{faq.question}</AccordionTrigger>
							<AccordionContent>{faq.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</main>
	);
}

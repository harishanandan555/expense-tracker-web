"use client";

import { useCallback } from "react";
import CountUp from "react-countup";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type Props = {
	formatter: Intl.NumberFormat;
	title: string;
	value: number;
	icon: React.ReactNode;
};

export const StatusCard = ({ formatter, title, value, icon }: Props) => {
	const formatFn = useCallback(() => {
		return formatter.format(value);
	}, [formatter, value]);

	return (
		<Card className="w-full h-24 flex flex-row items-center gap-2 p-4">
			{icon}
			<div className="space-y-1.5">
				<CardDescription>{title}</CardDescription>
				<CardTitle>
					<CountUp
						preserveValue
						redraw={false}
						end={value}
						decimals={2}
						formattingFn={formatFn}
					/>
				</CardTitle>
			</div>
		</Card>
	);
};

"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "@prisma/client";

import { GetCategoriesStatusResponseType } from "@/app/api/status/categories/route";
import { CurrencyFormatter, DateToUTCDate } from "@/lib/helpers";
import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { CategoryStatusCard } from "./category-status-card";

type Props = {
	settings: Settings;
	from: Date;
	to: Date;
};

export const CategoriesStatus = ({ settings, from, to }: Props) => {
	const statusQuery = useQuery<GetCategoriesStatusResponseType>({
		queryKey: ["overview", "status", "categories", from, to],
		queryFn: () =>
			fetch(
				`/api/status/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`,
			).then((res) => res.json()),
	});

	const formatter = useMemo(() => {
		return CurrencyFormatter(settings.currency);
	}, [settings.currency]);

	return (
		<div className="w-full flex flex-wrap md:flex-nowrap gap-2">
			<SkeletonWrapper isLoading={statusQuery.isLoading} fullWidth>
				<CategoryStatusCard
					formatter={formatter}
					type="income"
					data={statusQuery.data || []}
				/>
			</SkeletonWrapper>
			<SkeletonWrapper isLoading={statusQuery.isLoading} fullWidth>
				<CategoryStatusCard
					formatter={formatter}
					type="expense"
					data={statusQuery.data || []}
				/>
			</SkeletonWrapper>
		</div>
	);
};

"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { DateToUTCDate } from "@/lib/helpers";
import { SkeletonWrapper } from "@/components/globals/skeleton-wrapper";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { GetTransactionsHistoryType } from "@/app/api/transactions-history/route";

type Props = {
	from: Date;
	to: Date;
};

export const TransactionTable = ({ from, to }: Props) => {
	const transactionQuery = useQuery({
		queryKey: ["transactions", "history", from, to],
		queryFn: () =>
			fetch(
				`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`,
			).then((res) => res.json()),
	});

	const categoriesOptions = useMemo(() => {
		const categoriesMap = new Map();
		transactionQuery.data?.forEach(
			(transaction: GetTransactionsHistoryType[0]) => {
				categoriesMap.set(transaction.category, {
					value: transaction.category,
					label: `${transaction.categoryIcon} ${transaction.category}`,
				});
			},
		);

		const uniqueCategories = new Set(categoriesMap.values());
		return Array.from(uniqueCategories);
	}, [transactionQuery.data]);

	return (
		<SkeletonWrapper isLoading={transactionQuery.isLoading} fullWidth>
			<DataTable
				columns={columns}
				data={transactionQuery.data}
				categoriesOptions={categoriesOptions}
			/>
		</SkeletonWrapper>
	);
};

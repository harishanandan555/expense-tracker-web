"use cleint";

import { Category } from "@prisma/client";

type Props = {
	category: Category;
};

export const CategoryRow = ({ category }: Props) => {
	return (
		<div className="flex items-center gap-x-2">
			<span role="img">{category.icon}</span>
			<span>{category.name}</span>
		</div>
	);
};

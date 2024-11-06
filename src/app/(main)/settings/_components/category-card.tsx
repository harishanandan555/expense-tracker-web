// "use client";

// import { Button } from "@/components/ui/button";
// import { Category } from "@prisma/client";
// import { Trash } from "lucide-react";
// import { DeleteCategoryDialog } from "./delete-category-dialog";

// type Props = {
// 	category: Category;
// };

// export const CategoryCard = ({ category }: Props) => {
// 	return (
// 		<div className="border border-dashed rounded-lg flex flex-col items-center justify-center gap-4 h-40 p-4 hover:bg-accent hover:text-accent-foreground">
// 			<div className="flex flex-col items-center justify-center gap-2">
// 				<span className="text-3xl" role="img">
// 					{category.icon}
// 				</span>
// 				<p className="text-lg text-muted-foreground font-medium">
// 					{category.name}
// 				</p>
// 			</div>
// 			<DeleteCategoryDialog category={category}>
// 				<Button variant="ghost" className="w-full">
// 					<Trash className="mr-2 w-4 h-4" />
// 					Remove
// 				</Button>
// 			</DeleteCategoryDialog>
// 		</div>
// 	);
// };





"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { DeleteCategoryDialog } from "./delete-category-dialog";

type Props = {
	category: Category;
	isDefault: boolean;
};

export const CategoryCard = ({ category, isDefault }: Props) => {
	return (
		<div className="border border-dashed rounded-lg flex flex-col items-center justify-center gap-4 h-40 p-4 hover:bg-accent hover:text-accent-foreground">
			<div className="flex flex-col items-center justify-center gap-2">
				<span className="text-3xl" role="img">
					{category.icon}
				</span>
				<p className="text-lg text-muted-foreground font-medium">
					{category.name}
				</p>
			</div>
			{!isDefault && (
				<DeleteCategoryDialog category={category}>
					<Button variant="ghost" className="w-full">
						<Trash className="mr-2 w-4 h-4" />
						Remove
					</Button>
				</DeleteCategoryDialog>
			)}
		</div>
	);
};

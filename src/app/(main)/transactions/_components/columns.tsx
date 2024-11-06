"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GetTransactionsHistoryType } from "@/app/api/transactions-history/route";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { RowActions } from "./row-actions";

type TransactionHistoryRow = GetTransactionsHistoryType[0];

export const columns: ColumnDef<TransactionHistoryRow>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 capitalize">
          {row.original.categoryIcon}
          <div className="capitalize">{row.original.category}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="truncate text-sm font-medium">
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (

        // <div className="text-muted-foreground text-sm">
        //   {format(row.original.date, "PPP")}
        // </div>
        
        <div className="text-muted-foreground text-sm">
          {row.original.date ? (
            // Try to format the date if it's valid
            isNaN(new Date(row.original.date).getTime()) ? (
              "Invalid Date"
            ) : (
              format(new Date(row.original.date), "PPP")
            )
          ) : (
            // Fallback if date is missing
            "No Date Provided"
        )}
    </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const type = row.original.type;

      return (
        <Badge
          variant={type === "expense" ? "destructive" : "success"}
          className="capitalize"
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-lg font-semibold">
          {row.original.formattedAmount}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    enableHiding: false,
    header: "",
    cell: ({ row }) => {
      return <RowActions transaction={row.original} />;
    },
  },
];

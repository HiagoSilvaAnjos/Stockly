"use client";

import { formatCurrency } from "../_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { GetSalesDTO } from "@/app/_data-access/Sale/get-sales";
import SalesTableDropDownMenu from "./table-dropdown-menu";

export const SaleTableColumns: ColumnDef<GetSalesDTO>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    header: "Quantidade de Produtos",
    accessorKey: "totalProducts",
    cell: ({ row }) => {
      const totalProducts = row.original.totalProducts;
      return <span>{totalProducts}</span>;
    },
  },
  {
    header: "Valor Total",
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      const totalAmount = row.original.totalAmount;
      return <span>{formatCurrency(totalAmount)}</span>;
    },
  },
  {
    header: "Data",
    accessorKey: "date", // chave que vai pegar a data
    cell: ({ row }) => {
      const date = row.original.date;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    header: "Ações",
    accessorKey: "actions",
    cell: () => <SalesTableDropDownMenu />,
  },
];

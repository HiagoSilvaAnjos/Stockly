"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Fora de estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const status = product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK";
      const label = getStatusLabel(status);
      return (
        <Badge
          className="gap-1"
          variant={status === "IN_STOCK" ? "primary" : "destructive"}
        >
          {label}
        </Badge>
      );
    },
  },
];

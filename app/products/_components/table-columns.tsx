"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product as PrismaProduct } from "@prisma/client";

interface Product extends PrismaProduct {
  status: "IN_STOCK" | "OUT_OF_STOCK";
}
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
      const label = getStatusLabel(product.status);
      return (
        <Badge
          className="gap-1"
          variant={product.status === "IN_STOCK" ? "primary" : "destructive"}
        >
          {label}
        </Badge>
      );
    },
  },
];

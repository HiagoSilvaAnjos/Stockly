"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductActionsTable from "./table-dropdown-menu";
import { GetProductsDTO } from "@/app/_data-access/product/get-products";
import ProductStatusBadge from "@/app/_components/StatusBadge/product-status-badge";

export const productTableColumns: ColumnDef<GetProductsDTO>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
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
      return <ProductStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return <ProductActionsTable product={product} />;
    },
  },
];

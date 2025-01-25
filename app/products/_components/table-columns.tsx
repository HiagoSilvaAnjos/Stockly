"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import AlertDialogDelete from "./delete-dialog";

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
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <MoreHorizontalIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-1.5">
                <EditIcon size={16} /> Editar
              </DropdownMenuItem>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer gap-1.5">
                  <TrashIcon size={16} /> Deletar
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <DropdownMenuItem
                className="cursor-pointer gap-1.5"
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                <ClipboardCopyIcon size={16} /> Copiar ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogDelete productId={product.id} />
        </AlertDialog>
      );
    },
  },
];

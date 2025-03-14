"use client";

import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import AlertDialogDelete from "./delete-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { useState } from "react";
import { Product } from "@prisma/client";

interface ProductActionsTableProps {
  product: Product;
}

const ProductActionsTable = ({ product }: ProductActionsTableProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <AlertDialog>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer gap-1.5">
                <EditIcon size={16} /> Editar
              </DropdownMenuItem>
            </DialogTrigger>

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
        <UpsertProductDialogContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          setDialogIsOpen={setDialogIsOpen}
        />
        <AlertDialogDelete productId={product.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default ProductActionsTable;

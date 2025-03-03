"use client";

import { deleteSale } from "@/app/_actions/sales/delete_sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { GetProductsDTO } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { GetSalesDTO } from "@/app/_data-access/Sale/get-sales";

interface SaleTableDropDownMenuProps {
  Sale: Pick<GetSalesDTO, "id" | "saleProducts">;
  products: GetProductsDTO[];
  productsOptions: ComboboxOption[];
}

const SalesTableDropDownMenu = ({
  Sale,
  products,
  productsOptions,
}: SaleTableDropDownMenuProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda deletada com sucesso.");
    },
    onError: () => {
      toast.error("Error ao tentar deletar venda.");
    },
  });

  const handleCopyClipboardClock = () => {
    navigator.clipboard.writeText(Sale.id);
    toast.success("ID copiado para área de trasferência.");
  };

  const handleComfirmDeleteClick = async () =>
    executeDeleteSale({ id: Sale.id });

  return (
    <Sheet defaultOpen={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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

            <SheetTrigger asChild>
              <DropdownMenuItem className="cursor-pointer gap-1.5">
                <EditIcon size={16} /> Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer gap-1.5">
                <TrashIcon size={16} /> Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <DropdownMenuItem
              className="cursor-pointer gap-1.5"
              onClick={handleCopyClipboardClock}
            >
              <ClipboardCopyIcon size={16} /> Copiar ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você realmente deseja excluir esta venda?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você esta prestes a excluir esta venda. Esta ação não pode ser
              desfeita. Deseja continuar ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleComfirmDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <UpsertSheetContent
        products={products}
        productOptions={productsOptions}
        setIsOpenSheet={setSheetIsOpen}
        defaultSeletedProducts={Sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
          quantity: saleProduct.quantity,
        }))}
      />
    </Sheet>
  );
};

export default SalesTableDropDownMenu;

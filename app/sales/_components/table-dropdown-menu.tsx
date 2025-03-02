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
// import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sale } from "@prisma/client";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
// import { useState } from "react";

interface SaleTableDropDownMenuProps {
  Sale: Pick<Sale, "id">;
}

const SalesTableDropDownMenu = ({ Sale }: SaleTableDropDownMenuProps) => {
  // const [dialogIsOpen, setDialogIsOpen] = useState(false);

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
    <AlertDialog>
      {/* <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* <DialogTrigger asChild> */}
          <DropdownMenuItem className="cursor-pointer gap-1.5">
            <EditIcon size={16} /> Editar
          </DropdownMenuItem>
          {/* </DialogTrigger> */}

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
      {/* </Dialog> */}
    </AlertDialog>
  );
};

export default SalesTableDropDownMenu;

"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";

import { useState } from "react";
import UpsertProductDialogContent from "./upsert-product-dialog";

const AddProductButton = () => {
  // Definição do schema de validação
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} className="gap-2 self-end">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent setDialogIsOpen={setDialogIsOpen} />
    </Dialog>
  );
};

export default AddProductButton;

"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";
import { GetProductsDTO } from "@/app/_data-access/product/get-products";

interface UpsertSheetContentProps {
  products: GetProductsDTO[];
  productOptions: ComboboxOption[];
}

const UpsertSaleButton = ({
  products,
  productOptions,
}: UpsertSheetContentProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon size={16} /> Nova Venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        isOpen={sheetIsOpen}
        setIsOpenSheet={setSheetIsOpen}
        products={products}
        productOptions={productOptions}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;

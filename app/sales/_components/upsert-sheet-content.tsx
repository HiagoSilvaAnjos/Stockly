"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "../_helpers/currency";
import { UpsertSale } from "@/app/_actions/sales/upsert_sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";
import UpsertSaleTableDropdownMenu from "./upsert-sheet-dropdown-menu";
import { GetProductsDTO } from "@/app/_data-access/product/get-products";

const formSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório",
  }),
  quantity: z.coerce.number().int().positive({
    message: "A quantidade é obrigatória",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface SeletedProductProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsertSheetContentProps {
  saleId?: string;
  products: GetProductsDTO[];
  productOptions: ComboboxOption[];
  setIsOpenSheet: Dispatch<SetStateAction<boolean>>;
  defaultSeletedProducts?: SeletedProductProps[];
}
const UpsertSheetContent = ({
  saleId,
  productOptions,
  products,
  setIsOpenSheet,
  defaultSeletedProducts,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<
    SeletedProductProps[]
  >(defaultSeletedProducts ?? []);

  const { execute: executeUpsertSale } = useAction(UpsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda salva com sucesso.");
      setIsOpenSheet(false);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );

    if (!selectedProduct) return;

    setSelectedProducts((currentProduct) => {
      const existingProduct = currentProduct.find(
        (product) => product.id === data.productId,
      );

      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;

        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque",
          });

          return currentProduct;
        }
        form.reset();
        return currentProduct.map((product) => {
          if (product.id !== data.productId) return product;

          return {
            ...product,
            quantity: product.quantity + data.quantity,
          };
        });
      }

      const productIsOutOfStock = data.quantity > selectedProduct.stock;

      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque",
        });

        return currentProduct;
      }
      form.reset();
      return [
        ...currentProduct,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  const handleDeleteProduct = (productId: string) => {
    setSelectedProducts((currentProduct) => {
      return currentProduct.filter((product) => product.id !== productId);
    });
  };

  const onSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Adicionar venda</SheetTitle>
        <SheetDescription>
          Insira as informações de venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={productOptions}
                      placeholder="Selecione um produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Digite a Quantidade"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full gap-2" variant={"secondary"}>
            <PlusIcon size="20" /> Adicionar Venda
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista dos produtos adicionados á venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSaleTableDropdownMenu
                  deleteProduct={handleDeleteProduct}
                  product={product}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell>{formatCurrency(productTotal)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-4">
        <Button
          className="w-full"
          disabled={selectedProducts.length === 0}
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar Venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;

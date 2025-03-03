"server only";
import { db } from "@/app/_lib/prisma";

interface SaleProductDTO {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface GetSalesDTO {
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  id: string;
  saleProducts: SaleProductDTO[];
}

export const getSales = async (): Promise<GetSalesDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { product: true },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.saleProducts
      .map((product) => product.product.name)
      .join(" | "),
    totalAmount: sale.saleProducts.reduce(
      (acc, product) => acc + product.quantity * Number(product.unitPrice),
      0,
    ),
    totalProducts: sale.saleProducts.reduce(
      (acc, product) => acc + product.quantity,
      0,
    ),
    saleProducts: sale.saleProducts.map(
      (saleProduct): SaleProductDTO => ({
        productId: saleProduct.product.id,
        productName: saleProduct.product.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
      }),
    ),
  }));
};

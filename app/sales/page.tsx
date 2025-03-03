import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/Header/Header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import getProducts from "../_data-access/product/get-products";
import { getSales } from "../_data-access/Sale/get-sales";
import UpsertSaleButton from "./_components/create-sale-button";
import { SaleTableColumns } from "./_components/table-columns";

const sales = async () => {
  const products = await getProducts();
  const sales = await getSales();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const salesTableColumns = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderLeft>
          <UpsertSaleButton
            products={products}
            productOptions={productOptions}
          />
        </HeaderLeft>
      </Header>
      <DataTable columns={SaleTableColumns} data={salesTableColumns} />
    </div>
  );
};

export default sales;

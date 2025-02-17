import getProducts from "../_data-access/product/get-products";
import CreateSaleButton from "./_components/create-sale-button";

const sales = async () => {
  const products = await getProducts();

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>

        <CreateSaleButton products={products} productOptions={productOptions} />
      </div>
      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
};

export default sales;

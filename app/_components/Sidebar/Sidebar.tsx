const Sidebar = () => {
  return (
    <div className="w-64 flex-col bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-green-600">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <button className="w-full rounded bg-gray-500 bg-opacity-50 px-6 py-3 text-start">
          Dashboars
        </button>
        <button className="w-full rounded bg-opacity-50 px-6 py-3 text-start">
          Produtos
        </button>
        <button className="w-full rounded bg-opacity-50 px-6 py-3 text-start">
          Vendas
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

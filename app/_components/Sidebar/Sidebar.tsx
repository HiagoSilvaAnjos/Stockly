import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "../Sidebar-button/Sidebar-button";

const Sidebar = () => {
  return (
    <div className="w-64 flex-col bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-green-600">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={20} />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={20} />
          Pedidos
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;

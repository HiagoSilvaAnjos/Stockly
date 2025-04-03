import { CircleDollarSignIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTotalSale } from "@/app/_data-access/dashboard/get-total-sale";

const TotalSalesCard = async () => {
  const totalSales = await getTotalSale();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <CircleDollarSignIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
      <SummaryCardValue>{totalSales}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalSalesCard;

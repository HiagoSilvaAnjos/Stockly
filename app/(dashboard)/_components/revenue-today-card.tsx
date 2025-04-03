import { DollarSignIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { formatCurrency } from "@/app/sales/_helpers/currency";
import { getRevenueToday } from "@/app/_data-access/dashboard/get-revenue-today";

const RevenueTodayCard = async () => {
  const todayRevenue = await getRevenueToday();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSignIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default RevenueTodayCard;

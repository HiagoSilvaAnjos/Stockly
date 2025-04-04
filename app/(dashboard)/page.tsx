import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/Header/Header";
import { MostSoldProductItemSkeleton } from "./_components/most-sold-products-item";
import { Suspense } from "react";
import TotalRevenueCard from "./_components/total-revenue-card";
import RevenueTodayCard from "./_components/revenue-today-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import { SummaryCardSkeleton } from "./_components/summary-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";
import MostSoldProducts from "./_components/most-sold-product";

const Home = async () => {
  return (
    <div className="m-8 flex w-full flex-col space-y-8 rounded-lg p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral do dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <RevenueTodayCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalSalesCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalStockCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>
      <div className="grid h-[400px] grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-6">
              <div className="space-y-2">
                <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                <div className="h-4 w-48 rounded-md bg-gray-200" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>

        <Suspense fallback={<MostSoldProductItemSkeleton />}>
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;

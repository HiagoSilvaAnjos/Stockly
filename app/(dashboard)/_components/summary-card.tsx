import React from "react";

export const SummaryCardIcon = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 bg-opacity-10 text-emerald-500">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-sm font-medium text-slate-900">{children}</p>;
};

export const SummaryCardValue = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-2xl font-medium text-slate-900">{children}</p>;
};

export const SummaryCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2 rounded-xl bg-white p-6">{children}</div>;
};

export const SummaryCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="space-y-2">
        <div className="h-9 w-9 rounded-md bg-gray-200" />
        <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
        <div className="h-8 w-48 rounded-md bg-gray-200" />
      </div>
    </div>
  );
};

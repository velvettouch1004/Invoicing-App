'use client';

import { useEffect, useState } from 'react';
import { DashboardProps } from '@/lib/types/props';
import { columns } from '@/components/payments/columns';
import DataTable from './ui/data-table';

export default function Dashboard({ invoices }: DashboardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  /*   function handleFilter(filterCriteria: string) {
    const filteredInvoices = invoices.filter((invoice) => !filterCriteria || invoice.status === filterCriteria);
    setFilteredInvoices(filteredInvoices);
  } */

  return (
    <div className="flex flex-col gap-16 flex-1 px-2">
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-9 sm:pt-16 lg:pt-20">
        {/* <div className="flex flex-wrap sm:items-center gap-4">
          <SortBy />
          <Filter onFilterChange={handleFilter} />
          <AddInvoice />
        </div> */}
      </div>
      <DataTable
        columns={columns}
        data={invoices}
      />
    </div>
  );
}

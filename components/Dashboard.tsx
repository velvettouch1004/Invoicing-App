'use client';

import { useEffect, useState } from 'react';
import { DashboardProps } from '@/lib/types/props';
import { columns } from '@/components/payments/columns';
import { formatCurrency } from '@/lib/functions/formatCurrency';
import { ResponsivePie } from '@nivo/pie';
import { InvoiceData, StatusValue } from '@/lib/types/data';
import DataTable from './ui/data-table';
import { Card, CardDescription, CardHeader } from './ui/card';
import FilterBy from './Filter';
import AddInvoice from './invoice/AddInvoice';
import SortInvoices from './Sort';

export default function Dashboard({ invoices }: DashboardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  function handleFilter(filterCriteria: string) {
    const filter = invoices.filter((invoice) => !filterCriteria || invoice.status === filterCriteria);
    setFilteredInvoices(filter);
  }

  const groupedInvoices = invoices.reduce((groups, invoice) => {
    const newGroups = { ...groups };
    if (!newGroups[invoice.status]) newGroups[invoice.status] = [];
    newGroups[invoice.status].push(invoice);
    return newGroups;
  }, {} as Record<StatusValue, InvoiceData[]>);

  const transformedData = Object.keys(groupedInvoices).map((status) => ({
    id: status,
    label: status,
    value: groupedInvoices[status as StatusValue].length,
  }));

  const totalBilled = filteredInvoices.reduce((acc, invoice) => acc + invoice.billed, 0);

  const totalCancelled = filteredInvoices.reduce((acc, invoice) => acc + (invoice.status === 'cancelled' ? invoice.billed : 0), 0);

  const totalOverdue = filteredInvoices.reduce((acc, invoice) => acc + (invoice.status === 'overdue' ? invoice.billed : 0), 0);

  return (
    <div className="flex flex-col gap-16 flex-1 px-2">
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-9 sm:pt-16 lg:pt-20">
        <div className="flex flex-wrap sm:items-center justify-between gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <SortInvoices />
            <FilterBy onFilterChange={() => handleFilter} />
          </div>
          <AddInvoice />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-auto">
          <DataTable
            columns={columns}
            data={invoices}
          />
        </div>
        <div className="flex flex-col gap-4 flex-1 w-full m-0">
          <Card className="flex flex-col md:flex-row align-center">
            <div>
              <h2 className="sr-only">Total Billed (To date)</h2>
              <CardHeader className="text-center  pb-0"><h2 className="font-thin">{formatCurrency(totalBilled)}</h2></CardHeader>
              <CardHeader className="text-center">
                Total Billed
                <br />
                (To Date)
              </CardHeader>
            </div>
            <div>
              <h2 className="sr-only">Total Cancelled</h2>
              <CardHeader className="text-center pb-0"><h2 className="font-thin">{formatCurrency(totalCancelled)}</h2></CardHeader>
              <CardHeader className="text-center">Total Cancelled</CardHeader>
            </div>
            <div>
              <h2 className="sr-only">Total Overdue</h2>
              <CardHeader className="text-center pb-0"><h2 className="font-thin">{formatCurrency(totalOverdue)}</h2></CardHeader>
              <CardHeader className="text-center">Total Overdue</CardHeader>
            </div>
          </Card>
          <Card className="h-[250px] w-full py-4">
            {transformedData.length === 0 ? (
              <CardDescription className="text-center">No data available</CardDescription>
            ) : (
              <ResponsivePie
                enableArcLinkLabels={false}
                data={transformedData}
                colors={['#DBDAD6', '#D0CECB', '#C4C3C0', '#B9B8B6', '#AEADAB']}
                legends={
                  [
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: '#000',
                          },
                        },
                      ],
                      itemDirection: 'left-to-right',
                      itemHeight: 18,
                      itemOpacity: 1,
                      itemTextColor: '#999',
                      itemWidth: 100,
                      itemsSpacing: 0,
                      justify: false,
                      symbolShape: 'circle',
                      symbolSize: 18,
                      translateX: 0,
                      translateY: 56,
                    },
                  ]
                }
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
